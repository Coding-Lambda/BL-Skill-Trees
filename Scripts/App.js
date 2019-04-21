"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BLST;
(function (BLST) {
    var App = /** @class */ (function (_super) {
        __extends(App, _super);
        function App() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        App.prototype.render = function () {
            var Router = preactRouter.Router, Route = preactRouter.Route;
            return (preact.h("div", { class: "preact-app" },
                preact.h(preactRouter.Router, null,
                    preact.h(BLST.Views.Home, { path: BLST.createRootedPath("/") }),
                    preact.h(BLST.Views.GameInfo, { path: BLST.createRootedPath("/:gameId") }),
                    preact.h(BLST.Views.ClassInfo, { path: BLST.createRootedPath("/:gameId/:className") }),
                    preact.h(Route, { default: true, component: function () { return preact.h("h1", null, "404"); } }))));
        };
        return App;
    }(preact.Component));
    function adjustStartUpUrlIfNeeded() {
        var startUpUrlParam = location.search
            .slice(1) // remove leading "?"
            .split("&")
            .map(function (parts) { return parts
            .split("=")
            .map(decodeURIComponent); })
            .filter(function (pair) { return BLST.stringEqualsIgnoreCase(pair[0], "startUpUrl"); });
        if (startUpUrlParam.length > 0) {
            var startUpUrl = startUpUrlParam[0][1];
            history.replaceState({}, document.title, startUpUrl);
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        adjustStartUpUrlIfNeeded();
        var preactRoot = document.querySelector(".preact-root");
        if (preactRoot == null)
            throw new Error("Missing preact root");
        preact.render(preact.h(App, null), preactRoot);
    });
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Components;
    (function (Components) {
        Components.ClassList = function (_a) {
            var game = _a.game;
            return (preact.h("ol", { class: "component-game-list" }, game.classes.map(function (classInfo) {
                return preact.h("li", null,
                    preact.h("a", { href: BLST.createRootedPath("/" + game.id + "/" + classInfo.className) },
                        classInfo.characterName,
                        preact.h("br", null),
                        classInfo.className));
            })));
        };
    })(Components = BLST.Components || (BLST.Components = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Components;
    (function (Components) {
        Components.GameList = function (_a) {
            var games = _a.games;
            return (preact.h("ol", { class: "component-game-list" }, games.map(function (game) {
                return preact.h("li", null,
                    preact.h("a", { href: BLST.createRootedPath("/" + game.id) }, game.name));
            })));
        };
    })(Components = BLST.Components || (BLST.Components = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Components;
    (function (Components) {
        Components.RenderJson = function (_a) {
            var data = _a.data;
            return (preact.h("pre", { class: "component-print-as-json" }, JSON.stringify(data, null, 4)));
        };
    })(Components = BLST.Components || (BLST.Components = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Components;
    (function (Components) {
        Components.SkillVariable = function (_a) {
            var currentPoints = _a.currentPoints, variable = _a.variable;
            var hasPoints = currentPoints > 0;
            var pointsForCalculation = hasPoints ?
                currentPoints :
                1; // If 0 points invested, show stats of level 1
            var displayedValue;
            switch (variable.type) {
                case "calculated":
                    displayedValue = variable.calculator(variable.baseValue, pointsForCalculation);
                    break;
                case "linear":
                    displayedValue = variable.baseValue + (variable.incrementPerPoint * pointsForCalculation);
                    break;
                default:
                    throw new Error("Not implemented");
            }
            return (preact.h("span", { class: BLST.generateCssClass("component-skill-variable", "-type-" + variable.type) },
                variable.prefix,
                displayedValue,
                variable.suffix));
        };
    })(Components = BLST.Components || (BLST.Components = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Data;
    (function (Data) {
        Data.EMPTY_SLOT = undefined;
        Data.PER_LEVEL = "per level";
    })(Data = BLST.Data || (BLST.Data = {}));
})(BLST || (BLST = {}));
///<reference path="../DataTypes.ts" />
var BLST;
(function (BLST) {
    var Data;
    (function (Data) {
        var BL2;
        (function (BL2) {
            BL2.maya = {
                characterName: "Maya",
                className: "Siren",
                skillTrees: [
                    {
                        name: "Motion",
                        color: "green",
                        tiers: [
                            {
                                requiredTotalTreePoints: 0,
                                slots: [
                                    {
                                        name: "Ward",
                                        iconUrl: "TODO",
                                        maxPoints: 5,
                                        textRenderer: function (props) {
                                            var SkillVariable = BLST.Components.SkillVariable;
                                            return (preact.h("span", null,
                                                preact.h(SkillVariable, { variable: props.variables[0], currentPoints: props.currentPoints }),
                                                "% Shield Capacity and ",
                                                preact.h(SkillVariable, { variable: props.variables[1], currentPoints: props.currentPoints }),
                                                "% Shield Recharge Delay",
                                                props.currentPoints == 0 &&
                                                    " " + Data.PER_LEVEL,
                                                "."));
                                        },
                                        variables: [
                                            {
                                                type: "linear",
                                                baseValue: 0,
                                                incrementPerPoint: 5,
                                                prefix: "+ ",
                                            },
                                            {
                                                type: "linear",
                                                baseValue: 0,
                                                incrementPerPoint: 8,
                                                prefix: "- ",
                                            },
                                        ],
                                    },
                                    Data.EMPTY_SLOT,
                                    {
                                        name: "Accelerate",
                                        iconUrl: "TODO",
                                        maxPoints: 5,
                                        textRenderer: function (props) { return (preact.h("span", null, "TODO")); },
                                        variables: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "harmony",
                        color: "blue",
                        tiers: [],
                    },
                    {
                        name: "Cataclysm",
                        color: "red",
                        tiers: [],
                    },
                ],
            };
        })(BL2 = Data.BL2 || (Data.BL2 = {}));
    })(Data = BLST.Data || (BLST.Data = {}));
})(BLST || (BLST = {}));
///<reference path="Maya.tsx" />
var BLST;
(function (BLST) {
    var Data;
    (function (Data) {
        var BL2;
        (function (BL2) {
            BL2.gameInfo = {
                id: "BL2",
                name: "Borderlands 2",
                classes: [
                    BL2.maya,
                ],
            };
        })(BL2 = Data.BL2 || (Data.BL2 = {}));
    })(Data = BLST.Data || (BLST.Data = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Data;
    (function (Data) {
        Data.games = [
            Data.BL2.gameInfo,
        ];
    })(Data = BLST.Data || (BLST.Data = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    BLST.BASE_PATH = "/BL-Skill-Trees";
    function createRootedPath(pathPart) {
        var result = BLST.BASE_PATH;
        if (pathPart.length == 0 || pathPart[0] != "/") {
            result += "/";
        }
        result += pathPart;
        return result;
    }
    BLST.createRootedPath = createRootedPath;
    /**
     * Helper function to easily create css classes in preact
     * @param classNames
     */
    function generateCssClass() {
        var classNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classNames[_i] = arguments[_i];
        }
        return classNames
            .filter(function (name) { return typeof name == "string"; })
            .join(" ");
    }
    BLST.generateCssClass = generateCssClass;
    function stringEqualsIgnoreCase(a, b) {
        return a == null || b == null ?
            a == b :
            a.toUpperCase() == b.toUpperCase(); // prone to the "Turkish i"-problem
    }
    BLST.stringEqualsIgnoreCase = stringEqualsIgnoreCase;
    function arrayFirstOrNull(array, predicate) {
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            if (predicate(item))
                return item;
        }
        return null;
    }
    BLST.arrayFirstOrNull = arrayFirstOrNull;
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Views;
    (function (Views) {
        Views.ClassInfo = function (_a) {
            var className = _a.className, gameId = _a.gameId;
            var gameInfo = BLST.arrayFirstOrNull(BLST.Data.games, function (game) { return game.id == gameId; });
            if (gameInfo == null)
                throw "TODO";
            var classInfo = BLST.arrayFirstOrNull(gameInfo.classes, function (c) { return c.className == className; });
            if (classInfo == null)
                throw "TODO";
            return (preact.h(BLST.Components.RenderJson, { data: classInfo }));
        };
    })(Views = BLST.Views || (BLST.Views = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Views;
    (function (Views) {
        Views.GameInfo = function (_a) {
            var gameId = _a.gameId;
            var gameInfo = BLST.arrayFirstOrNull(BLST.Data.games, function (game) { return game.id == gameId; });
            return (preact.h("div", { class: "view-game-info" },
                gameInfo == null ?
                    preact.h("h2", null,
                        "No game with id '",
                        gameId,
                        "' was found")
                    :
                        preact.h(BLST.Components.ClassList, { game: gameInfo }),
                preact.h(BLST.Components.RenderJson, { data: gameInfo })));
        };
    })(Views = BLST.Views || (BLST.Views = {}));
})(BLST || (BLST = {}));
var BLST;
(function (BLST) {
    var Views;
    (function (Views) {
        Views.Home = function (props) {
            return (preact.h("div", { class: "view-home" },
                preact.h(BLST.Components.GameList, { games: BLST.Data.games }),
                preact.h(BLST.Components.RenderJson, { data: props })));
        };
    })(Views = BLST.Views || (BLST.Views = {}));
})(BLST || (BLST = {}));
