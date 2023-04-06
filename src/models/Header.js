export default class Header {

  constructor({
    headerColors = ["#BFE5E8", "#EFDDD1"],
    height = 70,
    elevation =  3,
    items = [],
    apiUrl,
    layout = "chain",
    isProfile = false,
    atTop = false,
    fixitNoUrl,
    oauthUrl,
    sites = [],
    draftMode = false
  }) {
    this.headerColors = headerColors;
    this.height = height;
    this.elevation = elevation;
    this.items = items;
    this.apiUrl = apiUrl;
    this.layout = layout;
    this.isProfile = isProfile || false;
    this.atTop = atTop;
    this.fixitNoUrl = fixitNoUrl;
    this.oauthUrl = oauthUrl;
    this.sites = sites;
    this.draftMode = draftMode
  }

  getHeaderBackground() {
    var gradient = "background-image: linear-gradient(to right, ";
    this.headerColors.forEach((x, index) => {
      gradient += x;
      gradient += index < this.headerColors.length - 1 ? ", " : ") !important;";
    });
    return gradient;
  }
}
