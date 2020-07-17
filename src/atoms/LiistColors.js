export class LiistColors {
  static names() {
    return Object.keys(LiistColors.dict);
  };

  static values() {
    return Object.values(LiistColors.dict);
  }

  static dict() {
    return LiistColors.dict;
  }

  static get(name) {
    if (!LiistColors.names().includes(name)) {
      console.warn(`the colorname you provided is invalid. Got: ${name}. Valid: ${LiistColors.names()}`);
    }
    return LiistColors.dict[name];
  }

  /*
   * THEMES are pairs of 2 colors (color and bgColor)
   */
  static themes() {
    return Object.keys(LiistColors.themeDict);
  }

  static getTheme(name) {
    if (!LiistColors.isValidTheme(name)) {
      console.warn(`the theme you provided is invalid. Got: ${name}. Valid: ${LiistColors.themes()}`);
    }
    return LiistColors.themeDict[name];
  }

  static isValidTheme(name) {
    return LiistColors.themes().includes(name);
  }

  /*
   * conditional transformation of color input
   * -> transforms input to hexcode if valid liist-color-name detected
   * -> otherwise returns same input
   */
  static transformColorInput(input) {
    if (LiistColors.names().includes(input)) {
      return LiistColors.get(input);
    }
    return input;
  }

  /*
   * loads CSS variables if they are not yet loaded
   * => conditional!
   */
  static initCssVariables() {
    if (!LiistColors._cssVariablesExist()) {
      let root = document.documentElement;
      Object.keys(LiistColors.dict).forEach(key => {
        root.style.setProperty(`--liist-${key}`, LiistColors.get(key));
      })
    }
  }

  static _cssVariablesExist() {
    try {
      const root = document.documentElement;
      const liistColorNames = LiistColors.names();
      for (let i = 0; i < liistColorNames.length; i++) {
        if (root.style.getPropertyValue(`--liist-${liistColorNames[i]}`) === "") {
          return false;
        }
      }
      return true;
    } catch(error) {
      console.warn("ERROR: this can happen when 'document.documentElement' is not accessible");
      console.log(error);
      return false;
    }
  }
}

/*
 * Define Dictionaries!
 */
LiistColors.dict = {
  sunii: "#F2D70B",
  skii: "#337EF8",
  grasii: "#18943F",
  hotii: "#E94732",
  piink: "#FAC8DA",
  creamii: "#F9DDC5",
  smokii: "#1A1A1A",
  viiolet: "#4F51C2",
  viiolet80: "#3D3E6C",
  viiolet60: "#8687A7",
  viiolet40: "#DBDCEB",
  viiolet20: "#EDEEF9",
}
LiistColors.themeDict = {
  viiolet20: { bgColor: "viiolet20", color: "viiolet80" },
  viiolet80: { bgColor: "viiolet80", color: "viiolet20" },
  viiolet80b: { bgColor: "viiolet80", color: "creamii" },
  sunii: { bgColor: "sunii", color: "viiolet80" },
  piink: { bgColor: "piink", color: "hotii" },
  grasii: { bgColor: "grasii", color: "piink" },
  hotii: { bgColor: "hotii", color: "creamii" },
  viiolet: { bgColor: "viiolet", color: "sunii" },
}

/*
 * when file is loaded, try to reate global css variables
 */
try {
  LiistColors.initCssVariables();
} catch(error) {
  console.warn("Initializing Global CSS Variables on loading of LiistColors.js did not work. You can still run 'LiistColors.initCssVariables()'");
  console.warn(error.message);
}
