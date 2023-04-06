<template>
  <div class="vue-otc-input">
    <div class="otc-wrapper" :class="isInputFocused ? activeWrapperClassHandler : wrapperClassHandler"
      :style="wrapperStyle" :id="id">
      <v-text-field v-for="(digitInput, index) in digits" ref="digitInput" :key="id + index" autocomplete="one-time-code"
        v-model="inputValue[index]" class="otc-input"
        :class="[inputClassHandler, activeInput === index ? activeInputClassHandler : '']" :placeholder="placeholder"
        :disabled="isDisabled" @focus="onFocus(index)" @blur="onBlur" @paste="OnPaste" @input="onInput(index, $event)"
        @change="onChanged(index)" @keydown="keydownHandler(index, $event)" :style="inputStyle" />
    </div>
    <span v-if="!isValid" :class="errorClassHandler">
      <slot name="errorMessage"></slot>
    </span>
</div>
</template>
  
<script>

export default {
  name: "otc-input",
  props: {
    id: {
      type: String,
      default: "otc",
    },
    digits: {
      type: Number,
      default: 6,
    },
    mode: {
      type: String,
      default: "separate",
    },
    type: {
      type: String,
      default: "number",
    },
    placeholder: {
      type: String,
      default: "-",
    },
    radius: {
      type: Number,
      default: 5,
    },
    gap: {
      type: Number,
      default: 10,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    errorClass: {
      type: String,
      default: "",
    },
    separateInputClass: {
      type: String,
      default: "",
    },
    separateWrapperClass: {
      type: String,
      default: "",
    },
    groupInputClass: {
      type: String,
      default: "",
    },
    groupWrapperClass: {
      type: String,
      default: "",
    },
    activeInputClass: {
      type: String,
      default: "",
    },
    activeWrapperClass: {
      type: String,
      default: "",
    } 
  },
  data() {
    return {
      inputValue: [],
      joinedValue: "",
      isInputFocused: false,
      activeInput: -1,
    };
  },
  mounted() {
    if (this.autoFocus && !this.isDisabled) {
      this.onFocus(0);
      this.$refs.digitInput[0].focus();
      //setting input type based on the existing types for now
      const types = ["text", "password", "number"];
      if (types.indexOf(this.type) != -1) {
        for (let box of this.$refs.digitInput) {
          box.type = this.type;
        }
      }
    }
  },
  computed: {
    wrapperStyle() {
      const dir = this.rtl ? "rtl" : "ltr";
      const styles = {
        direction: dir,
        gap: `${this.gap}px`,
        "border-radius": `${this.radius}px`,
      };
      return styles;
    },
    inputStyle() {
      return {
        "--border-radius": `${this.radius}px`,
      };
    },
    inputClassHandler() {
      if (this.mode === "separate") {
        if (this.isValid) {
          return this.separateInputClass ? this.separateInputClass : "defualt-input-separate";
        } else {
          return this.separateInputClass ? this.separateInputClass : "defualt-error-input-separate";
        }
      }
      if (this.mode === "group") {
        return this.groupInputClass ? this.groupInputClass : "defualt-input-group";
      }
      return "";
    },
    activeInputClassHandler() {
      if (this.mode === "separate") {
        return this.activeInputClass ? this.activeInputClass : "defualt-active-input";
      }
      return "";
    },
    activeWrapperClassHandler() {
      if (this.mode === "group") {
        if (this.isValid) {
          return this.activeWrapperClass ? this.activeWrapperClass : "defualt-active-wrapper";
        } else {
          return this.activeWrapperClass ? this.activeWrapperClass : "defualt-error-wrapper-group";
        }
      }
      return "";
    },
    wrapperClassHandler() {
      if (this.mode === "separate") {
        return this.separateWrapperClass ? this.separateWrapperClass : "defualt-wrapper-separate";
      }
      if (this.mode === "group") {
        if (this.isValid) {
          return this.groupWrapperClass ? this.groupWrapperClass : "defualt-wrapper-group";
        } else {
          return this.groupWrapperClass ? this.groupWrapperClass : "defualt-error-wrapper-group";
        }
      }
      return "";
    },
    errorClassHandler() {
      return this.errorClass ? this.errorClass : "default-error-class";
    },
  },
  methods: {
    keydownHandler(index, e) {
      if (e.keyCode === 8 && e.target.value === "") {
        this.$refs.digitInput[Math.max(0, index - 1)].focus();
      }
    },
    onInput(index) {
      const [first, ...rest] =
        this.type === "number"
          ? this.inputValue[index].replace(/[^0-9]/g, "")
          : this.inputValue[index];
      this.inputValue[index] = first === null || first === undefined ? "" : first;
      const lastInputBox = index === this.digits - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        this.$refs.digitInput[index + 1].focus();
      }
      this.joinedValue = this.inputValue.map((value) => value).join("");
      this.$emit("value", this.joinedValue);
      if (this.joinedValue.length === this.digits) {
        this.onComplete(this.joinedValue);
      }
    },
    onFocus(index) {
      this.activeInput = index;
      this.isInputFocused = true;
    },
    onBlur() {
      this.activeInput = -1;
      this.isInputFocused = false;
    },
    onComplete(joinedValue) {
      this.onBlur();
      this.$refs.digitInput[this.digits - 1].blur();
      this.$emit("value", this.joinedValue);
      if (this.type === "password") {
        this.$emit("on-complete", joinedValue);
      }
      else
        this.$emit("on-complete", joinedValue);
    },
    onChanged(index) {
      this.$emit("on-changed", this.inputValue[index]);
    },
    OnPaste(event) {
      event.stopPropagation();
      event.preventDefault();
      if(event.clipboardData){
        if(event.clipboardData.getData('Text').length === this.digits){
          this.inputValue = event.clipboardData.getData('Text').split('');
        }
      }
      this.$emit("on-paste", event.clipboardData.getData('Text'));
    },
  },
};
</script>
  
<style lang="scss">
.vue-otc-input {
  width: max-content;
  margin: auto;
  .otc-wrapper {
    direction: var(--direction);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.3s;
    max-width: 326px;

    .otc-input:disabled {
      background-color: #ececec !important;
    }

    .defualt-input-separate {
      text-align: center;
      font-weight: 600;
      width: 3rem;
      height: 48px;
    }

    .defualt-error-input-separate {
      text-align: center;
      font-weight: 600;
      width: 3rem;
      height: 48px;
    }

    @media only screen and (max-width: 600px) {
      .defualt-input-separate {
        width: 2.5rem;
        height: 40px;
      }

      .defualt-input-group {
        width: 2.5rem;
        height: 40px;
      }
    }

    .defualt-input-group {
      background-color: transparent;
      font-weight: 600;
      border: none;
      width: 3rem;
      height: 48px;
      text-align: center;
    }

    .defualt-active-input {
      border: solid 2px #525252;
    }

    .defualt-active-wrapper {
      border: solid 2px #525252;
    }

    .default-error-class {
      color: #d50000;
      font-weight: bold;
    }

    .v-input__control {
      text-align-last: center !important;
    }

    .v-input__slot {
      background-color: white;
      height: 46px;
      &:before {
        border-color: #579FA7 !important;
        border-width: 2px 0 0 0 !important;
      }
    }

  }

  .defualt-wrapper-separate {
    background: transparent;
  }

  .defualt-wrapper-group {
    border: solid 2px #ececec;
  }

  .defualt-error-wrapper-group {
    border: solid 2px #d50000;
  }
}

input:focus {
  outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
  