/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "bundle/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/animation/index.html
	var baseFx = __webpack_require__(142);
	var fx = __webpack_require__(207);
	var easing = __webpack_require__(208);
	var domStyle = __webpack_require__(15);
	var dom = __webpack_require__(13);
	var aspect = __webpack_require__(19);
	var on = __webpack_require__(18);
	
	// define a function to return the animation which
	// swaps the positions of 2 nodes
	function swapAnim(node1, node2) {
	    var posn1 = parseInt(domStyle.get(node1, "left")),
	        posn2 = parseInt(domStyle.get(node2, "left"));
	
	    return moveNodes = fx.combine([
	        fx.slideTo({
	            duration: 1200,
	            node: node2,
	            left: posn1
	        }),
	        fx.slideTo({
	            duration: 1200,
	            node: node1,
	            left: posn2
	        })
	    ]);
	}
	
	
	var originalOrder = true; // track which order our content nodes are in
	
	var swapButton = dom.byId("swapButton"),
	    c1 = originalOrder ? dom.byId("content1") : dom.byId("content2"),
	    c2 = originalOrder ? dom.byId("content2") : dom.byId("content1"),
	    container = dom.byId("container");
	
	// Set up a click handlers to run our animations
	on(swapButton, "click", function(evt){
	
	    // chain the swap nodes animation
	    // with another to fade out a background color in our container
	    var anim = fx.chain([
	        swapAnim(c1, c2),
	        baseFx.animateProperty({
	            node: container,
	            properties: {
	                backgroundColor: "#fff"
	            }
	        })
	    ]);
	    // before the animation begins, set initial container background
	    aspect.before(anim, "beforeBegin", function(){
	        domStyle.set(container, "backgroundColor", "#eee");
	    });
	
	    // when the animation ends, toggle the originalOrder
	    on(anim, "End", function(n1, n2){
	        originalOrder = !originalOrder;
	    });
	
	    anim.play();
	});

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(7), __webpack_require__(6), module], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, config, require, module){module={id:"dojo/_base/kernel"}
		// module:
		//		dojo/_base/kernel
	
		// This module is the foundational module of the dojo boot sequence; it defines the dojo object.
	
		var
			// loop variables for this module
			i, p,
	
			// create dojo, dijit, and dojox
			// FIXME: in 2.0 remove dijit, dojox being created by dojo
			global = (function () { return this; })(),
			dijit = {},
			dojox = {},
			dojo = {
				// summary:
				//		This module is the foundational module of the dojo boot sequence; it defines the dojo object.
	
				// notice dojo takes ownership of the value of the config module
				config:config,
				global:global,
				dijit:dijit,
				dojox:dojox
			};
	
	
		// Configure the scope map. For a 100% AMD application, the scope map is not needed other than to provide
		// a _scopeName property for the dojo, dijit, and dojox root object so those packages can create
		// unique names in the global space.
		//
		// Built, legacy modules use the scope map to allow those modules to be expressed as if dojo, dijit, and dojox,
		// where global when in fact they are either global under different names or not global at all. In v1.6-, the
		// config variable "scopeMap" was used to map names as used within a module to global names. This has been
		// subsumed by the AMD map configuration variable which can relocate packages to different names. For backcompat,
		// only the "*" mapping is supported. See http://livedocs.dojotoolkit.org/developer/design/loader#legacy-cross-domain-mode for details.
		//
		// The following computations contort the packageMap for this dojo instance into a scopeMap.
		var scopeMap =
				// a map from a name used in a legacy module to the (global variable name, object addressed by that name)
				// always map dojo, dijit, and dojox
				{
					dojo:["dojo", dojo],
					dijit:["dijit", dijit],
					dojox:["dojox", dojox]
				},
	
			packageMap =
				// the package map for this dojo instance; note, a foreign loader or no pacakgeMap results in the above default config
				(require.map && require.map[module.id.match(/[^\/]+/)[0]]),
	
			item;
	
	
		// process all mapped top-level names for this instance of dojo
		for(p in packageMap){
			if(scopeMap[p]){
				// mapped dojo, dijit, or dojox
				scopeMap[p][0] = packageMap[p];
			}else{
				// some other top-level name
				scopeMap[p] = [packageMap[p], {}];
			}
		}
	
		// publish those names to _scopeName and, optionally, the global namespace
		for(p in scopeMap){
			item = scopeMap[p];
			item[1]._scopeName = item[0];
			if(!config.noGlobals){
				global[item[0]] = item[1];
			}
		}
		dojo.scopeMap = scopeMap;
	
		/*===== dojo.__docParserConfigureScopeMap(scopeMap); =====*/
	
		// FIXME: dojo.baseUrl and dojo.config.baseUrl should be deprecated
		dojo.baseUrl = dojo.config.baseUrl = require.baseUrl;
		dojo.isAsync = !has("dojo-loader") || require.async;
		dojo.locale = config.locale;
	
		var rev = "$Rev: 3594395 $".match(/[0-9a-f]{7,}/);
		dojo.version = {
			// summary:
			//		Version number of the Dojo Toolkit
			// description:
			//		Hash about the version, including
			//
			//		- major: Integer: Major version. If total version is "1.2.0beta1", will be 1
			//		- minor: Integer: Minor version. If total version is "1.2.0beta1", will be 2
			//		- patch: Integer: Patch version. If total version is "1.2.0beta1", will be 0
			//		- flag: String: Descriptor flag. If total version is "1.2.0beta1", will be "beta1"
			//		- revision: Number: The Git rev from which dojo was pulled
	
			major: 1, minor: 11, patch: 1, flag: "",
			revision: rev ? rev[0] : NaN,
			toString: function(){
				var v = dojo.version;
				return v.major + "." + v.minor + "." + v.patch + v.flag + " (" + v.revision + ")";	// String
			}
		};
	
		// If has("extend-dojo") is truthy, then as a dojo module is defined it should push it's definitions
		// into the dojo object, and conversely. In 2.0, it will likely be unusual to augment another object
		// as a result of defining a module. This has feature gives a way to force 2.0 behavior as the code
		// is migrated. Absent specific advice otherwise, set extend-dojo to truthy.
		has.add("extend-dojo", 1);
	
		if(!has("csp-restrictions")){
			(Function("d", "d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(dojo);
		}
		/*=====
		dojo.eval = function(scriptText){
			// summary:
			//		A legacy method created for use exclusively by internal Dojo methods. Do not use this method
			//		directly unless you understand its possibly-different implications on the platforms your are targeting.
			// description:
			//		Makes an attempt to evaluate scriptText in the global scope. The function works correctly for browsers
			//		that support indirect eval.
			//
			//		As usual, IE does not. On IE, the only way to implement global eval is to
			//		use execScript. Unfortunately, execScript does not return a value and breaks some current usages of dojo.eval.
			//		This implementation uses the technique of executing eval in the scope of a function that is a single scope
			//		frame below the global scope; thereby coming close to the global scope. Note carefully that
			//
			//		dojo.eval("var pi = 3.14;");
			//
			//		will define global pi in non-IE environments, but define pi only in a temporary local scope for IE. If you want
			//		to define a global variable using dojo.eval, write something like
			//
			//		dojo.eval("window.pi = 3.14;")
			// scriptText:
			//		The text to evaluation.
			// returns:
			//		The result of the evaluation. Often `undefined`
		};
		=====*/
	
	
		if(has("host-rhino")){
			dojo.exit = function(exitcode){
				quit(exitcode);
			};
		}else{
			dojo.exit = function(){
			};
		}
	
		if(!has("host-webworker")){
			// console is immutable in FF30+, https://bugs.dojotoolkit.org/ticket/18100
			has.add("dojo-guarantee-console",
				// ensure that console.log, console.warn, etc. are defined
				1
			);
		}
	
		if(has("dojo-guarantee-console")){
			// IE 9 bug: https://bugs.dojotoolkit.org/ticket/18197
			has.add("console-as-object", Function.prototype.bind && console && typeof console.log === "object");
			typeof console != "undefined" || (console = {});  // intentional assignment
			//	Be careful to leave 'log' always at the end
			var cn = [
				"assert", "count", "debug", "dir", "dirxml", "error", "group",
				"groupEnd", "info", "profile", "profileEnd", "time", "timeEnd",
				"trace", "warn", "log"
			];
			var tn;
			i = 0;
			while((tn = cn[i++])){
				if(!console[tn]){
					(function(){
						var tcn = tn + "";
						console[tcn] = ('log' in console) ? function(){
							var a = Array.prototype.slice.call(arguments);
							a.unshift(tcn + ":");
							console["log"](a.join(" "));
						} : function(){};
						console[tcn]._fake = true;
					})();
				}else if(has("console-as-object")){
					console[tn] = Function.prototype.bind.call(console[tn], console);
				}
			}
		}
	
		has.add("dojo-debug-messages",
			// include dojo.deprecated/dojo.experimental implementations
			!!config.isDebug
		);
		dojo.deprecated = dojo.experimental =  function(){};
		if(has("dojo-debug-messages")){
			dojo.deprecated = function(/*String*/ behaviour, /*String?*/ extra, /*String?*/ removal){
				// summary:
				//		Log a debug message to indicate that a behavior has been
				//		deprecated.
				// behaviour: String
				//		The API or behavior being deprecated. Usually in the form
				//		of "myApp.someFunction()".
				// extra: String?
				//		Text to append to the message. Often provides advice on a
				//		new function or facility to achieve the same goal during
				//		the deprecation period.
				// removal: String?
				//		Text to indicate when in the future the behavior will be
				//		removed. Usually a version number.
				// example:
				//	| dojo.deprecated("myApp.getTemp()", "use myApp.getLocaleTemp() instead", "1.0");
	
				var message = "DEPRECATED: " + behaviour;
				if(extra){ message += " " + extra; }
				if(removal){ message += " -- will be removed in version: " + removal; }
				console.warn(message);
			};
	
			dojo.experimental = function(/* String */ moduleName, /* String? */ extra){
				// summary:
				//		Marks code as experimental.
				// description:
				//		This can be used to mark a function, file, or module as
				//		experimental.	 Experimental code is not ready to be used, and the
				//		APIs are subject to change without notice.	Experimental code may be
				//		completed deleted without going through the normal deprecation
				//		process.
				// moduleName: String
				//		The name of a module, or the name of a module file or a specific
				//		function
				// extra: String?
				//		some additional message for the user
				// example:
				//	| dojo.experimental("dojo.data.Result");
				// example:
				//	| dojo.experimental("dojo.weather.toKelvin()", "PENDING approval from NOAA");
	
				var message = "EXPERIMENTAL: " + moduleName + " -- APIs subject to change without notice.";
				if(extra){ message += " " + extra; }
				console.warn(message);
			};
		}
	
		has.add("dojo-modulePaths",
			// consume dojo.modulePaths processing
			1
		);
		if(has("dojo-modulePaths")){
			// notice that modulePaths won't be applied to any require's before the dojo/_base/kernel factory is run;
			// this is the v1.6- behavior.
			if(config.modulePaths){
				dojo.deprecated("dojo.modulePaths", "use paths configuration");
				var paths = {};
				for(p in config.modulePaths){
					paths[p.replace(/\./g, "/")] = config.modulePaths[p];
				}
				require({paths:paths});
			}
		}
	
		has.add("dojo-moduleUrl",
			// include dojo.moduleUrl
			1
		);
		if(has("dojo-moduleUrl")){
			dojo.moduleUrl = function(/*String*/module, /*String?*/url){
				// summary:
				//		Returns a URL relative to a module.
				// example:
				//	|	var pngPath = dojo.moduleUrl("acme","images/small.png");
				//	|	console.dir(pngPath); // list the object properties
				//	|	// create an image and set it's source to pngPath's value:
				//	|	var img = document.createElement("img");
				//	|	img.src = pngPath;
				//	|	// add our image to the document
				//	|	dojo.body().appendChild(img);
				// example:
				//		you may de-reference as far as you like down the package
				//		hierarchy.  This is sometimes handy to avoid lengthy relative
				//		urls or for building portable sub-packages. In this example,
				//		the `acme.widget` and `acme.util` directories may be located
				//		under different roots (see `dojo.registerModulePath`) but the
				//		the modules which reference them can be unaware of their
				//		relative locations on the filesystem:
				//	|	// somewhere in a configuration block
				//	|	dojo.registerModulePath("acme.widget", "../../acme/widget");
				//	|	dojo.registerModulePath("acme.util", "../../util");
				//	|
				//	|	// ...
				//	|
				//	|	// code in a module using acme resources
				//	|	var tmpltPath = dojo.moduleUrl("acme.widget","templates/template.html");
				//	|	var dataPath = dojo.moduleUrl("acme.util","resources/data.json");
	
				dojo.deprecated("dojo.moduleUrl()", "use require.toUrl", "2.0");
	
				// require.toUrl requires a filetype; therefore, just append the suffix "/*.*" to guarantee a filetype, then
				// remove the suffix from the result. This way clients can request a url w/out a filetype. This should be
				// rare, but it maintains backcompat for the v1.x line (note: dojo.moduleUrl will be removed in v2.0).
				// Notice * is an illegal filename so it won't conflict with any real path map that may exist the paths config.
				var result = null;
				if(module){
					result = require.toUrl(module.replace(/\./g, "/") + (url ? ("/" + url) : "") + "/*.*").replace(/\/\*\.\*/, "") + (url ? "" : "/");
				}
				return result;
			};
		}
	
		dojo._hasResource = {}; // for backward compatibility with layers built with 1.6 tooling
	
		return dojo;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(require){var module = { config: function(){ return {"config-deferredInstrumentation":0,"config-dojo-loader-catches":0,"config-tlmSiblingOfDojo":0,"dojo-amd-factory-scan":0,"dojo-combo-api":0,"dojo-config-api":1,"dojo-config-require":0,"dojo-debug-messages":0,"dojo-dom-ready-api":1,"dojo-firebug":0,"dojo-guarantee-console":1,"dojo-has-api":1,"dojo-inject-api":1,"dojo-loader":1,"dojo-log-api":0,"dojo-modulePaths":0,"dojo-moduleUrl":0,"dojo-publish-privates":0,"dojo-requirejs-api":0,"dojo-sniff":1,"dojo-sync-loader":0,"dojo-test-sniff":0,"dojo-timeout-api":0,"dojo-trace-api":0,"dojo-undef-api":0,"dojo-v1x-i18n-Api":1,"dom":1,"host-browser":1,"extend-dojo":1,"touch":0}; } };
		// module:
		//		dojo/has
		// summary:
		//		Defines the has.js API and several feature tests used by dojo.
		// description:
		//		This module defines the has API as described by the project has.js with the following additional features:
		//
		//		- the has test cache is exposed at has.cache.
		//		- the method has.add includes a forth parameter that controls whether or not existing tests are replaced
		//		- the loader's has cache may be optionally copied into this module's has cahce.
		//
		//		This module adopted from https://github.com/phiggins42/has.js; thanks has.js team!
	
		// try to pull the has implementation from the loader; both the dojo loader and bdLoad provide one
		// if using a foreign loader, then the has cache may be initialized via the config object for this module
		// WARNING: if a foreign loader defines require.has to be something other than the has.js API, then this implementation fail
		var has = require.has || function(){};
		if(!has("dojo-has-api")){
			var
				isBrowser =
					// the most fundamental decision: are we in the browser?
					typeof window != "undefined" &&
					typeof location != "undefined" &&
					typeof document != "undefined" &&
					window.location == location && window.document == document,
	
				// has API variables
				global = (function () { return this; })(),
				doc = isBrowser && document,
				element = doc && doc.createElement("DiV"),
				cache = (module.config && module.config()) || {};
	
			has = function(name){
				// summary:
				//		Return the current value of the named feature.
				//
				// name: String|Integer
				//		The name (if a string) or identifier (if an integer) of the feature to test.
				//
				// description:
				//		Returns the value of the feature named by name. The feature must have been
				//		previously added to the cache by has.add.
	
				return typeof cache[name] == "function" ? (cache[name] = cache[name](global, doc, element)) : cache[name]; // Boolean
			};
	
			has.cache = cache;
	
			has.add = function(name, test, now, force){
				// summary:
				//	 	Register a new feature test for some named feature.
				// name: String|Integer
				//	 	The name (if a string) or identifier (if an integer) of the feature to test.
				// test: Function
				//		 A test function to register. If a function, queued for testing until actually
				//		 needed. The test function should return a boolean indicating
				//	 	the presence of a feature or bug.
				// now: Boolean?
				//		 Optional. Omit if `test` is not a function. Provides a way to immediately
				//		 run the test and cache the result.
				// force: Boolean?
				//	 	Optional. If the test already exists and force is truthy, then the existing
				//	 	test will be replaced; otherwise, add does not replace an existing test (that
				//	 	is, by default, the first test advice wins).
				// example:
				//		A redundant test, testFn with immediate execution:
				//	|	has.add("javascript", function(){ return true; }, true);
				//
				// example:
				//		Again with the redundantness. You can do this in your tests, but we should
				//		not be doing this in any internal has.js tests
				//	|	has.add("javascript", true);
				//
				// example:
				//		Three things are passed to the testFunction. `global`, `document`, and a generic element
				//		from which to work your test should the need arise.
				//	|	has.add("bug-byid", function(g, d, el){
				//	|		// g	== global, typically window, yadda yadda
				//	|		// d	== document object
				//	|		// el == the generic element. a `has` element.
				//	|		return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
				//	|	});
	
				(typeof cache[name]=="undefined" || force) && (cache[name]= test);
				return now && has(name);
			};
	
			// since we're operating under a loader that doesn't provide a has API, we must explicitly initialize
			// has as it would have otherwise been initialized by the dojo loader; use has.add to the builder
			// can optimize these away iff desired
			has.add("host-browser", isBrowser);
			has.add("host-node", (typeof process == "object" && process.versions && process.versions.node && process.versions.v8));
			has.add("host-rhino", (typeof load == "function" && (typeof Packages == "function" || typeof Packages == "object")));
			has.add("dom", isBrowser);
			has.add("dojo-dom-ready-api", 1);
			has.add("dojo-sniff", 1);
		}
	
		if(has("host-browser")){
			// Common application level tests
			has.add("dom-addeventlistener", !!document.addEventListener);
	
			// Do the device and browser have touch capability?
			has.add("touch", "ontouchstart" in document
				|| ("onpointerdown" in document && navigator.maxTouchPoints > 0)
				|| window.navigator.msMaxTouchPoints);
	
			// Touch events support
			has.add("touch-events", "ontouchstart" in document);
	
			// Test if pointer events are supported and enabled, with either standard names ("pointerdown" etc.) or
			// IE specific names ("MSPointerDown" etc.).  Tests are designed to work on embedded C# WebBrowser Controls
			// in addition to IE, Edge, and future versions of Firefox and Chrome.
			// Note that on IE11, has("pointer-events") and has("MSPointer") are both true.
			has.add("pointer-events", "pointerEnabled" in window.navigator ?
					window.navigator.pointerEnabled : "PointerEvent" in window);
			has.add("MSPointer", window.navigator.msPointerEnabled);
	
			// I don't know if any of these tests are really correct, just a rough guess
			has.add("device-width", screen.availWidth || innerWidth);
	
			// Tests for DOMNode.attributes[] behavior:
			//	 - dom-attributes-explicit - attributes[] only lists explicitly user specified attributes
			//	 - dom-attributes-specified-flag (IE8) - need to check attr.specified flag to skip attributes user didn't specify
			//	 - Otherwise, in IE6-7. attributes[] will list hundreds of values, so need to do outerHTML to get attrs instead.
			var form = document.createElement("form");
			has.add("dom-attributes-explicit", form.attributes.length == 0); // W3C
			has.add("dom-attributes-specified-flag", form.attributes.length > 0 && form.attributes.length < 40);	// IE8
		}
	
		has.clearElement = function(element){
			// summary:
			//	 Deletes the contents of the element passed to test functions.
			element.innerHTML= "";
			return element;
		};
	
		has.normalize = function(id, toAbsMid){
			// summary:
			//	 Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
			//
			// toAbsMid: Function
			//	 Resolves a relative module id into an absolute module id
			var
				tokens = id.match(/[\?:]|[^:\?]*/g), i = 0,
				get = function(skip){
					var term = tokens[i++];
					if(term == ":"){
						// empty string module name, resolves to 0
						return 0;
					}else{
						// postfixed with a ? means it is a feature to branch on, the term is the name of the feature
						if(tokens[i++] == "?"){
							if(!skip && has(term)){
								// matched the feature, get the first value from the options
								return get();
							}else{
								// did not match, get the second value, passing over the first
								get(true);
								return get(skip);
							}
						}
						// a module
						return term || 0;
					}
				};
			id = get();
			return id && toAbsMid(id);
		};
	
		has.load = function(id, parentRequire, loaded){
			// summary:
			//		Conditional loading of AMD modules based on a has feature test value.
			// id: String
			//		Gives the resolved module id to load.
			// parentRequire: Function
			//		The loader require function with respect to the module that contained the plugin resource in it's
			//		dependency list.
			// loaded: Function
			//	 Callback to loader that consumes result of plugin demand.
	
			if(id){
				parentRequire([id], loaded);
			}else{
				loaded();
			}
		};
	
		return has;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },

/***/ 5:
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },

/***/ 6:
/***/ function(module, exports) {

	var registered_modules = {};
	function dojoRequire(module, cb){
		if (module instanceof Array){
			var res = module.map(function(m){ return dojoRequire(m); });
			if (cb) cb.apply(this, res);
		}
		else {
			if (registered_modules[module]) {
				return registered_modules[module];
			}
			else {
				console.error('Dynamic dojo require is not supported. Trying to require "' + module + '"');
			}
		}
	}
	dojoRequire.async = true;
	dojoRequire.toUrl = function(url) {
		return url;
	};
	dojoRequire.register = function(module_name, module){
		registered_modules[module_name] = module;
		return module;
	};
	dojoRequire.unregister = function(module_name){
		delete registered_modules[module_name];
	};
	module.exports = dojoRequire;

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, require){
		// module:
		//		dojo/_base/config
	
	/*=====
	return {
		// summary:
		//		This module defines the user configuration during bootstrap.
		// description:
		//		By defining user configuration as a module value, an entire configuration can be specified in a build,
		//		thereby eliminating the need for sniffing and or explicitly setting in the global variable dojoConfig.
		//		Also, when multiple instances of dojo exist in a single application, each will necessarily be located
		//		at an unique absolute module identifier as given by the package configuration. Implementing configuration
		//		as a module allows for specifying unique, per-instance configurations.
		// example:
		//		Create a second instance of dojo with a different, instance-unique configuration (assume the loader and
		//		dojo.js are already loaded).
		//		|	// specify a configuration that creates a new instance of dojo at the absolute module identifier "myDojo"
		//		|	require({
		//		|		packages:[{
		//		|			name:"myDojo",
		//		|			location:".", //assume baseUrl points to dojo.js
		//		|		}]
		//		|	});
		//		|
		//		|	// specify a configuration for the myDojo instance
		//		|	define("myDojo/config", {
		//		|		// normal configuration variables go here, e.g.,
		//		|		locale:"fr-ca"
		//		|	});
		//		|
		//		|	// load and use the new instance of dojo
		//		|	require(["myDojo"], function(dojo){
		//		|		// dojo is the new instance of dojo
		//		|		// use as required
		//		|	});
	
		// isDebug: Boolean
		//		Defaults to `false`. If set to `true`, ensures that Dojo provides
		//		extended debugging feedback to the console.
		isDebug: false,
	
		// locale: String
		//		The locale to assume for loading localized resources in this page,
		//		specified according to [RFC 3066](http://www.ietf.org/rfc/rfc3066.txt).
		//		Must be specified entirely in lowercase, e.g. `en-us` and `zh-cn`.
		//		See the documentation for `dojo.i18n` and `dojo.requireLocalization`
		//		for details on loading localized resources. If no locale is specified,
		//		Dojo assumes the locale of the user agent, according to `navigator.userLanguage`
		//		or `navigator.language` properties.
		locale: undefined,
	
		// extraLocale: Array
		//		No default value. Specifies additional locales whose
		//		resources should also be loaded alongside the default locale when
		//		calls to `dojo.requireLocalization()` are processed.
		extraLocale: undefined,
	
		// baseUrl: String
		//		The directory in which `dojo.js` is located. Under normal
		//		conditions, Dojo auto-detects the correct location from which it
		//		was loaded. You may need to manually configure `baseUrl` in cases
		//		where you have renamed `dojo.js` or in which `<base>` tags confuse
		//		some browsers (e.g. IE 6). The variable `dojo.baseUrl` is assigned
		//		either the value of `djConfig.baseUrl` if one is provided or the
		//		auto-detected root if not. Other modules are located relative to
		//		this path. The path should end in a slash.
		baseUrl: undefined,
	
		// modulePaths: [deprecated] Object
		//		A map of module names to paths relative to `dojo.baseUrl`. The
		//		key/value pairs correspond directly to the arguments which
		//		`dojo.registerModulePath` accepts. Specifying
		//		`djConfig.modulePaths = { "foo": "../../bar" }` is the equivalent
		//		of calling `dojo.registerModulePath("foo", "../../bar");`. Multiple
		//		modules may be configured via `djConfig.modulePaths`.
		modulePaths: {},
	
		// addOnLoad: Function|Array
		//		Adds a callback via dojo/ready. Useful when Dojo is added after
		//		the page loads and djConfig.afterOnLoad is true. Supports the same
		//		arguments as dojo/ready. When using a function reference, use
		//		`djConfig.addOnLoad = function(){};`. For object with function name use
		//		`djConfig.addOnLoad = [myObject, "functionName"];` and for object with
		//		function reference use
		//		`djConfig.addOnLoad = [myObject, function(){}];`
		addOnLoad: null,
	
		// parseOnLoad: Boolean
		//		Run the parser after the page is loaded
		parseOnLoad: false,
	
		// require: String[]
		//		An array of module names to be loaded immediately after dojo.js has been included
		//		in a page.
		require: [],
	
		// defaultDuration: Number
		//		Default duration, in milliseconds, for wipe and fade animations within dijits.
		//		Assigned to dijit.defaultDuration.
		defaultDuration: 200,
	
		// dojoBlankHtmlUrl: String
		//		Used by some modules to configure an empty iframe. Used by dojo/io/iframe and
		//		dojo/back, and dijit/popup support in IE where an iframe is needed to make sure native
		//		controls do not bleed through the popups. Normally this configuration variable
		//		does not need to be set, except when using cross-domain/CDN Dojo builds.
		//		Save dojo/resources/blank.html to your domain and set `djConfig.dojoBlankHtmlUrl`
		//		to the path on your domain your copy of blank.html.
		dojoBlankHtmlUrl: undefined,
	
		// ioPublish: Boolean?
		//		Set this to true to enable publishing of topics for the different phases of
		//		IO operations. Publishing is done via dojo/topic.publish(). See dojo/main.__IoPublish for a list
		//		of topics that are published.
		ioPublish: false,
	
		// transparentColor: Array
		//		Array containing the r, g, b components used as transparent color in dojo.Color;
		//		if undefined, [255,255,255] (white) will be used.
		transparentColor: undefined,
		
		// deps: Function|Array
		//		Defines dependencies to be used before the loader has been loaded.
		//		When provided, they cause the loader to execute require(deps, callback) 
		//		once it has finished loading. Should be used with callback.
		deps: undefined,
		
		// callback: Function|Array
		//		Defines a callback to be used when dependencies are defined before 
		//		the loader has been loaded. When provided, they cause the loader to 
		//		execute require(deps, callback) once it has finished loading. 
		//		Should be used with deps.
		callback: undefined,
		
		// deferredInstrumentation: Boolean
		//		Whether deferred instrumentation should be loaded or included
		//		in builds.
		deferredInstrumentation: true,
	
		// useDeferredInstrumentation: Boolean|String
		//		Whether the deferred instrumentation should be used.
		//
		//		* `"report-rejections"`: report each rejection as it occurs.
		//		* `true` or `1` or `"report-unhandled-rejections"`: wait 1 second
		//			in an attempt to detect unhandled rejections.
		useDeferredInstrumentation: "report-unhandled-rejections"
	};
	=====*/
	
		var result = {};
		if(has("dojo-config-api")){
			// must be the dojo loader; take a shallow copy of require.rawConfig
			var src = require.rawConfig, p;
			for(p in src){
				result[p] = src[p];
			}
		}else{
			var adviseHas = function(featureSet, prefix, booting){
				for(p in featureSet){
					p!="has" && has.add(prefix + p, featureSet[p], 0, booting);
				}
			};
			var global = (function () { return this; })();
			result = has("dojo-loader") ?
				// must be a built version of the dojo loader; all config stuffed in require.rawConfig
				require.rawConfig :
				// a foreign loader
				global.dojoConfig || global.djConfig || {};
			adviseHas(result, "config", 1);
			adviseHas(result.has, "", 1);
		}
	
		if(!result.locale && typeof navigator != "undefined"){
			// Default locale for browsers (ensure it's read from user-settings not download locale).
			var language = (navigator.languages && navigator.languages.length) ? navigator.languages[0] :
				(navigator.language || navigator.userLanguage);
			if(language){
				result.locale = language.toLowerCase();
			}
		}
	
		return result;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has){
		// module:
		//		dojo/_base/lang
	
		has.add("bug-for-in-skips-shadowed", function(){
			// if true, the for-in iterator skips object properties that exist in Object's prototype (IE 6 - ?)
			for(var i in {toString: 1}){
				return 0;
			}
			return 1;
		});
	
		// Helper methods
		var _extraNames =
				has("bug-for-in-skips-shadowed") ?
					"hasOwnProperty.valueOf.isPrototypeOf.propertyIsEnumerable.toLocaleString.toString.constructor".split(".") : [],
	
			_extraLen = _extraNames.length,
	
			getProp = function(/*Array*/parts, /*Boolean*/create, /*Object*/context){
				if(!context){
					if(parts[0] && dojo.scopeMap[parts[0]]) {
						// Voodoo code from the old days where "dojo" or "dijit" maps to some special object
						// rather than just window.dojo
						context = dojo.scopeMap[parts.shift()][1];
					}else{
						context = dojo.global;
					}
				}
	
				try{
					for(var i = 0; i < parts.length; i++){
						var p = parts[i];
						if(!(p in context)){
							if(create){
								context[p] = {};
							}else{
								return;		// return undefined
							}
						}
						context = context[p];
					}
					return context; // mixed
				}catch(e){
					// "p in context" throws an exception when context is a number, boolean, etc. rather than an object,
					// so in that corner case just return undefined (by having no return statement)
				}
			},
	
			opts = Object.prototype.toString,
	
			efficient = function(obj, offset, startWith){
				return (startWith||[]).concat(Array.prototype.slice.call(obj, offset||0));
			},
	
			_pattern = /\{([^\}]+)\}/g;
	
		// Module export
		var lang = {
			// summary:
			//		This module defines Javascript language extensions.
	
			// _extraNames: String[]
			//		Lists property names that must be explicitly processed during for-in iteration
			//		in environments that have has("bug-for-in-skips-shadowed") true.
			_extraNames:_extraNames,
	
			_mixin: function(dest, source, copyFunc){
				// summary:
				//		Copies/adds all properties of source to dest; returns dest.
				// dest: Object
				//		The object to which to copy/add all properties contained in source.
				// source: Object
				//		The object from which to draw all properties to copy into dest.
				// copyFunc: Function?
				//		The process used to copy/add a property in source; defaults to the Javascript assignment operator.
				// returns:
				//		dest, as modified
				// description:
				//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
				//		found in Object.prototype, are copied/added to dest. Copying/adding each particular property is
				//		delegated to copyFunc (if any); copyFunc defaults to the Javascript assignment operator if not provided.
				//		Notice that by default, _mixin executes a so-called "shallow copy" and aggregate types are copied/added by reference.
				var name, s, i, empty = {};
				for(name in source){
					// the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
					// inherited from Object.prototype.	 For example, if dest has a custom toString() method,
					// don't overwrite it with the toString() method that source inherited from Object.prototype
					s = source[name];
					if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
						dest[name] = copyFunc ? copyFunc(s) : s;
					}
				}
	
				if(has("bug-for-in-skips-shadowed")){
					if(source){
						for(i = 0; i < _extraLen; ++i){
							name = _extraNames[i];
							s = source[name];
							if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
								dest[name] = copyFunc ? copyFunc(s) : s;
							}
						}
					}
				}
	
				return dest; // Object
			},
	
			mixin: function(dest, sources){
				// summary:
				//		Copies/adds all properties of one or more sources to dest; returns dest.
				// dest: Object
				//		The object to which to copy/add all properties contained in source. If dest is falsy, then
				//		a new object is manufactured before copying/adding properties begins.
				// sources: Object...
				//		One of more objects from which to draw all properties to copy into dest. sources are processed
				//		left-to-right and if more than one of these objects contain the same property name, the right-most
				//		value "wins".
				// returns: Object
				//		dest, as modified
				// description:
				//		All properties, including functions (sometimes termed "methods"), excluding any non-standard extensions
				//		found in Object.prototype, are copied/added from sources to dest. sources are processed left to right.
				//		The Javascript assignment operator is used to copy/add each property; therefore, by default, mixin
				//		executes a so-called "shallow copy" and aggregate types are copied/added by reference.
				// example:
				//		make a shallow copy of an object
				//	|	var copy = lang.mixin({}, source);
				// example:
				//		many class constructors often take an object which specifies
				//		values to be configured on the object. In this case, it is
				//		often simplest to call `lang.mixin` on the `this` object:
				//	|	declare("acme.Base", null, {
				//	|		constructor: function(properties){
				//	|			// property configuration:
				//	|			lang.mixin(this, properties);
				//	|
				//	|			console.log(this.quip);
				//	|			//	...
				//	|		},
				//	|		quip: "I wasn't born yesterday, you know - I've seen movies.",
				//	|		// ...
				//	|	});
				//	|
				//	|	// create an instance of the class and configure it
				//	|	var b = new acme.Base({quip: "That's what it does!" });
				// example:
				//		copy in properties from multiple objects
				//	|	var flattened = lang.mixin(
				//	|		{
				//	|			name: "Frylock",
				//	|			braces: true
				//	|		},
				//	|		{
				//	|			name: "Carl Brutanananadilewski"
				//	|		}
				//	|	);
				//	|
				//	|	// will print "Carl Brutanananadilewski"
				//	|	console.log(flattened.name);
				//	|	// will print "true"
				//	|	console.log(flattened.braces);
	
				if(!dest){ dest = {}; }
				for(var i = 1, l = arguments.length; i < l; i++){
					lang._mixin(dest, arguments[i]);
				}
				return dest; // Object
			},
	
			setObject: function(name, value, context){
				// summary:
				//		Set a property from a dot-separated string, such as "A.B.C"
				// description:
				//		Useful for longer api chains where you have to test each object in
				//		the chain, or when you have an object reference in string format.
				//		Objects are created as needed along `path`. Returns the passed
				//		value if setting is successful or `undefined` if not.
				// name: String
				//		Path to a property, in the form "A.B.C".
				// value: anything
				//		value or object to place at location given by name
				// context: Object?
				//		Optional. Object to use as root of path. Defaults to
				//		`dojo.global`.
				// example:
				//		set the value of `foo.bar.baz`, regardless of whether
				//		intermediate objects already exist:
				//	| lang.setObject("foo.bar.baz", value);
				// example:
				//		without `lang.setObject`, we often see code like this:
				//	| // ensure that intermediate objects are available
				//	| if(!obj["parent"]){ obj.parent = {}; }
				//	| if(!obj.parent["child"]){ obj.parent.child = {}; }
				//	| // now we can safely set the property
				//	| obj.parent.child.prop = "some value";
				//		whereas with `lang.setObject`, we can shorten that to:
				//	| lang.setObject("parent.child.prop", "some value", obj);
	
				var parts = name.split("."), p = parts.pop(), obj = getProp(parts, true, context);
				return obj && p ? (obj[p] = value) : undefined; // Object
			},
	
			getObject: function(name, create, context){
				// summary:
				//		Get a property from a dot-separated string, such as "A.B.C"
				// description:
				//		Useful for longer api chains where you have to test each object in
				//		the chain, or when you have an object reference in string format.
				// name: String
				//		Path to an property, in the form "A.B.C".
				// create: Boolean?
				//		Optional. Defaults to `false`. If `true`, Objects will be
				//		created at any point along the 'path' that is undefined.
				// context: Object?
				//		Optional. Object to use as root of path. Defaults to
				//		'dojo.global'. Null may be passed.
				return !name ? context : getProp(name.split("."), create, context); // Object
			},
	
			exists: function(name, obj){
				// summary:
				//		determine if an object supports a given method
				// description:
				//		useful for longer api chains where you have to test each object in
				//		the chain. Useful for object and method detection.
				// name: String
				//		Path to an object, in the form "A.B.C".
				// obj: Object?
				//		Object to use as root of path. Defaults to
				//		'dojo.global'. Null may be passed.
				// example:
				//	| // define an object
				//	| var foo = {
				//	|		bar: { }
				//	| };
				//	|
				//	| // search the global scope
				//	| lang.exists("foo.bar"); // true
				//	| lang.exists("foo.bar.baz"); // false
				//	|
				//	| // search from a particular scope
				//	| lang.exists("bar", foo); // true
				//	| lang.exists("bar.baz", foo); // false
				return lang.getObject(name, false, obj) !== undefined; // Boolean
			},
	
			// Crockford (ish) functions
	
			isString: function(it){
				// summary:
				//		Return true if it is a String
				// it: anything
				//		Item to test.
				return (typeof it == "string" || it instanceof String); // Boolean
			},
	
			isArray: Array.isArray || function(it){
				// summary:
				//		Return true if it is an Array.
				// it: anything
				//		Item to test.
				return opts.call(it) == "[object Array]"; // Boolean
			},
	
			isFunction: function(it){
				// summary:
				//		Return true if it is a Function
				// it: anything
				//		Item to test.
				return opts.call(it) === "[object Function]";
			},
	
			isObject: function(it){
				// summary:
				//		Returns true if it is a JavaScript object (or an Array, a Function
				//		or null)
				// it: anything
				//		Item to test.
				return it !== undefined &&
					(it === null || typeof it == "object" || lang.isArray(it) || lang.isFunction(it)); // Boolean
			},
	
			isArrayLike: function(it){
				// summary:
				//		similar to isArray() but more permissive
				// it: anything
				//		Item to test.
				// returns:
				//		If it walks like a duck and quacks like a duck, return `true`
				// description:
				//		Doesn't strongly test for "arrayness".  Instead, settles for "isn't
				//		a string or number and has a length property". Arguments objects
				//		and DOM collections will return true when passed to
				//		isArrayLike(), but will return false when passed to
				//		isArray().
				return !!it && // Boolean
					// keep out built-in constructors (Number, String, ...) which have length
					// properties
					!lang.isString(it) && !lang.isFunction(it) &&
					!(it.tagName && it.tagName.toLowerCase() == 'form') &&
					(lang.isArray(it) || isFinite(it.length));
			},
	
			isAlien: function(it){
				// summary:
				//		Returns true if it is a built-in function or some other kind of
				//		oddball that *should* report as a function but doesn't
				return it && !lang.isFunction(it) && /\{\s*\[native code\]\s*\}/.test(String(it)); // Boolean
			},
	
			extend: function(ctor, props){
				// summary:
				//		Adds all properties and methods of props to constructor's
				//		prototype, making them available to all instances created with
				//		constructor.
				// ctor: Object
				//		Target constructor to extend.
				// props: Object
				//		One or more objects to mix into ctor.prototype
				for(var i=1, l=arguments.length; i<l; i++){
					lang._mixin(ctor.prototype, arguments[i]);
				}
				return ctor; // Object
			},
	
			_hitchArgs: function(scope, method){
				var pre = lang._toArray(arguments, 2);
				var named = lang.isString(method);
				return function(){
					// arrayify arguments
					var args = lang._toArray(arguments);
					// locate our method
					var f = named ? (scope||dojo.global)[method] : method;
					// invoke with collected args
					return f && f.apply(scope || this, pre.concat(args)); // mixed
				}; // Function
			},
	
			hitch: function(scope, method){
				// summary:
				//		Returns a function that will only ever execute in the given scope.
				//		This allows for easy use of object member functions
				//		in callbacks and other places in which the "this" keyword may
				//		otherwise not reference the expected scope.
				//		Any number of default positional arguments may be passed as parameters
				//		beyond "method".
				//		Each of these values will be used to "placehold" (similar to curry)
				//		for the hitched function.
				// scope: Object
				//		The scope to use when method executes. If method is a string,
				//		scope is also the object containing method.
				// method: Function|String...
				//		A function to be hitched to scope, or the name of the method in
				//		scope to be hitched.
				// example:
				//	|	lang.hitch(foo, "bar")();
				//		runs foo.bar() in the scope of foo
				// example:
				//	|	lang.hitch(foo, myFunction);
				//		returns a function that runs myFunction in the scope of foo
				// example:
				//		Expansion on the default positional arguments passed along from
				//		hitch. Passed args are mixed first, additional args after.
				//	|	var foo = { bar: function(a, b, c){ console.log(a, b, c); } };
				//	|	var fn = lang.hitch(foo, "bar", 1, 2);
				//	|	fn(3); // logs "1, 2, 3"
				// example:
				//	|	var foo = { bar: 2 };
				//	|	lang.hitch(foo, function(){ this.bar = 10; })();
				//		execute an anonymous function in scope of foo
				if(arguments.length > 2){
					return lang._hitchArgs.apply(dojo, arguments); // Function
				}
				if(!method){
					method = scope;
					scope = null;
				}
				if(lang.isString(method)){
					scope = scope || dojo.global;
					if(!scope[method]){ throw(['lang.hitch: scope["', method, '"] is null (scope="', scope, '")'].join('')); }
					return function(){ return scope[method].apply(scope, arguments || []); }; // Function
				}
				return !scope ? method : function(){ return method.apply(scope, arguments || []); }; // Function
			},
	
			delegate: (function(){
				// boodman/crockford delegation w/ cornford optimization
				function TMP(){}
				return function(obj, props){
					TMP.prototype = obj;
					var tmp = new TMP();
					TMP.prototype = null;
					if(props){
						lang._mixin(tmp, props);
					}
					return tmp; // Object
				};
			})(),
			/*=====
			delegate: function(obj, props){
				// summary:
				//		Returns a new object which "looks" to obj for properties which it
				//		does not have a value for. Optionally takes a bag of properties to
				//		seed the returned object with initially.
				// description:
				//		This is a small implementation of the Boodman/Crockford delegation
				//		pattern in JavaScript. An intermediate object constructor mediates
				//		the prototype chain for the returned object, using it to delegate
				//		down to obj for property lookup when object-local lookup fails.
				//		This can be thought of similarly to ES4's "wrap", save that it does
				//		not act on types but rather on pure objects.
				// obj: Object
				//		The object to delegate to for properties not found directly on the
				//		return object or in props.
				// props: Object...
				//		an object containing properties to assign to the returned object
				// returns:
				//		an Object of anonymous type
				// example:
				//	|	var foo = { bar: "baz" };
				//	|	var thinger = lang.delegate(foo, { thud: "xyzzy"});
				//	|	thinger.bar == "baz"; // delegated to foo
				//	|	foo.thud == undefined; // by definition
				//	|	thinger.thud == "xyzzy"; // mixed in from props
				//	|	foo.bar = "thonk";
				//	|	thinger.bar == "thonk"; // still delegated to foo's bar
			},
			=====*/
	
			_toArray: has("ie") ?
				(function(){
					function slow(obj, offset, startWith){
						var arr = startWith||[];
						for(var x = offset || 0; x < obj.length; x++){
							arr.push(obj[x]);
						}
						return arr;
					}
					return function(obj){
						return ((obj.item) ? slow : efficient).apply(this, arguments);
					};
				})() : efficient,
			/*=====
			 _toArray: function(obj, offset, startWith){
				 // summary:
				 //		Converts an array-like object (i.e. arguments, DOMCollection) to an
				 //		array. Returns a new Array with the elements of obj.
				 // obj: Object
				 //		the object to "arrayify". We expect the object to have, at a
				 //		minimum, a length property which corresponds to integer-indexed
				 //		properties.
				 // offset: Number?
				 //		the location in obj to start iterating from. Defaults to 0.
				 //		Optional.
				 // startWith: Array?
				 //		An array to pack with the properties of obj. If provided,
				 //		properties in obj are appended at the end of startWith and
				 //		startWith is the returned array.
			 },
			 =====*/
	
			partial: function(/*Function|String*/ method /*, ...*/){
				// summary:
				//		similar to hitch() except that the scope object is left to be
				//		whatever the execution context eventually becomes.
				// description:
				//		Calling lang.partial is the functional equivalent of calling:
				//		|	lang.hitch(null, funcName, ...);
				// method:
				//		The function to "wrap"
				var arr = [ null ];
				return lang.hitch.apply(dojo, arr.concat(lang._toArray(arguments))); // Function
			},
	
			clone: function(/*anything*/ src){
				// summary:
				//		Clones objects (including DOM nodes) and all children.
				//		Warning: do not clone cyclic structures.
				// src:
				//		The object to clone
				if(!src || typeof src != "object" || lang.isFunction(src)){
					// null, undefined, any non-object, or function
					return src;	// anything
				}
				if(src.nodeType && "cloneNode" in src){
					// DOM Node
					return src.cloneNode(true); // Node
				}
				if(src instanceof Date){
					// Date
					return new Date(src.getTime());	// Date
				}
				if(src instanceof RegExp){
					// RegExp
					return new RegExp(src);   // RegExp
				}
				var r, i, l;
				if(lang.isArray(src)){
					// array
					r = [];
					for(i = 0, l = src.length; i < l; ++i){
						if(i in src){
							r[i] = lang.clone(src[i]);
						}
					}
					// we don't clone functions for performance reasons
					//		}else if(d.isFunction(src)){
					//			// function
					//			r = function(){ return src.apply(this, arguments); };
				}else{
					// generic objects
					r = src.constructor ? new src.constructor() : {};
				}
				return lang._mixin(r, src, lang.clone);
			},
	
	
			trim: String.prototype.trim ?
				function(str){ return str.trim(); } :
				function(str){ return str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); },
			/*=====
			 trim: function(str){
				 // summary:
				 //		Trims whitespace from both sides of the string
				 // str: String
				 //		String to be trimmed
				 // returns: String
				 //		Returns the trimmed string
				 // description:
				 //		This version of trim() was selected for inclusion into the base due
				 //		to its compact size and relatively good performance
				 //		(see [Steven Levithan's blog](http://blog.stevenlevithan.com/archives/faster-trim-javascript)
				 //		Uses String.prototype.trim instead, if available.
				 //		The fastest but longest version of this function is located at
				 //		lang.string.trim()
			 },
			 =====*/
	
			replace: function(tmpl, map, pattern){
				// summary:
				//		Performs parameterized substitutions on a string. Throws an
				//		exception if any parameter is unmatched.
				// tmpl: String
				//		String to be used as a template.
				// map: Object|Function
				//		If an object, it is used as a dictionary to look up substitutions.
				//		If a function, it is called for every substitution with following parameters:
				//		a whole match, a name, an offset, and the whole template
				//		string (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/String/replace
				//		for more details).
				// pattern: RegEx?
				//		Optional regular expression objects that overrides the default pattern.
				//		Must be global and match one item. The default is: /\{([^\}]+)\}/g,
				//		which matches patterns like that: "{xxx}", where "xxx" is any sequence
				//		of characters, which doesn't include "}".
				// returns: String
				//		Returns the substituted string.
				// example:
				//	|	// uses a dictionary for substitutions:
				//	|	lang.replace("Hello, {name.first} {name.last} AKA {nick}!",
				//	|		{
				//	|			nick: "Bob",
				//	|			name: {
				//	|				first:	"Robert",
				//	|				middle: "X",
				//	|				last:		"Cringely"
				//	|			}
				//	|		});
				//	|	// returns: Hello, Robert Cringely AKA Bob!
				// example:
				//	|	// uses an array for substitutions:
				//	|	lang.replace("Hello, {0} {2}!",
				//	|		["Robert", "X", "Cringely"]);
				//	|	// returns: Hello, Robert Cringely!
				// example:
				//	|	// uses a function for substitutions:
				//	|	function sum(a){
				//	|		var t = 0;
				//	|		arrayforEach(a, function(x){ t += x; });
				//	|		return t;
				//	|	}
				//	|	lang.replace(
				//	|		"{count} payments averaging {avg} USD per payment.",
				//	|		lang.hitch(
				//	|			{ payments: [11, 16, 12] },
				//	|			function(_, key){
				//	|				switch(key){
				//	|					case "count": return this.payments.length;
				//	|					case "min":		return Math.min.apply(Math, this.payments);
				//	|					case "max":		return Math.max.apply(Math, this.payments);
				//	|					case "sum":		return sum(this.payments);
				//	|					case "avg":		return sum(this.payments) / this.payments.length;
				//	|				}
				//	|			}
				//	|		)
				//	|	);
				//	|	// prints: 3 payments averaging 13 USD per payment.
				// example:
				//	|	// uses an alternative PHP-like pattern for substitutions:
				//	|	lang.replace("Hello, ${0} ${2}!",
				//	|		["Robert", "X", "Cringely"], /\$\{([^\}]+)\}/g);
				//	|	// returns: Hello, Robert Cringely!
	
				return tmpl.replace(pattern || _pattern, lang.isFunction(map) ?
					map : function(_, k){ return lang.getObject(k, false, map); });
			}
		};
	
		has("extend-dojo") && lang.mixin(dojo, lang);
	
		return lang;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has){
		// module:
		//		dojo/sniff
	
		/*=====
		return function(){
			// summary:
			//		This module sets has() flags based on the current browser.
			//		It returns the has() function.
		};
		=====*/
	
		if(has("host-browser")){
			var n = navigator,
				dua = n.userAgent,
				dav = n.appVersion,
				tv = parseFloat(dav);
			has.add("air", dua.indexOf("AdobeAIR") >= 0);
			has.add("wp", parseFloat(dua.split("Windows Phone")[1]) || undefined);
			has.add("msapp", parseFloat(dua.split("MSAppHost/")[1]) || undefined);
			has.add("khtml", dav.indexOf("Konqueror") >= 0 ? tv : undefined);
			has.add("edge", parseFloat(dua.split("Edge/")[1]) || undefined);
			has.add("opr", parseFloat(dua.split("OPR/")[1]) || undefined);
			// NOTE: https://dev.opera.com/blog/opera-user-agent-strings-opera-15-and-beyond/
			has.add("webkit", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
				&& !has("edge") && parseFloat(dua.split("WebKit/")[1]) || undefined);
			has.add("chrome", !has("edge") && !has("opr")
					&& parseFloat(dua.split("Chrome/")[1]) || undefined);
			has.add("android", !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
					&& parseFloat(dua.split("Android ")[1]) || undefined);
			has.add("safari", dav.indexOf("Safari") >= 0
					&& !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
					&& !has("chrome") && !has("android") && !has("edge") && !has("opr") ?
				parseFloat(dav.split("Version/")[1]) : undefined);
			has.add("mac", dav.indexOf("Macintosh") >= 0);
			has.add("quirks", document.compatMode == "BackCompat");
			if(!has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
					&& dua.match(/(iPhone|iPod|iPad)/)){
				var p = RegExp.$1.replace(/P/, "p");
				var v = dua.match(/OS ([\d_]+)/) ? RegExp.$1 : "1";
				var os = parseFloat(v.replace(/_/, ".").replace(/_/g, ""));
				has.add(p, os);		// "iphone", "ipad" or "ipod"
				has.add("ios", os);
			}
			has.add("bb", (dua.indexOf("BlackBerry") >= 0 || dua.indexOf("BB10") >= 0) && parseFloat(dua.split("Version/")[1]) || undefined);
			has.add("trident", parseFloat(dav.split("Trident/")[1]) || undefined);
	
			has.add("svg", typeof SVGAngle !== "undefined");
	
			if(!has("webkit")){
				// Opera
				if(dua.indexOf("Opera") >= 0){
					// see http://dev.opera.com/articles/view/opera-ua-string-changes and http://www.useragentstring.com/pages/Opera/
					// 9.8 has both styles; <9.8, 9.9 only old style
					has.add("opera", tv >= 9.8 ? parseFloat(dua.split("Version/")[1]) || tv : tv);
				}
	
				// Mozilla and firefox
				if(dua.indexOf("Gecko") >= 0 && !has("wp") // NOTE: necessary since Windows Phone 8.1 Update 1
						&& !has("khtml") && !has("trident") && !has("edge")){
					has.add("mozilla", tv);
				}
				if(has("mozilla")){
					//We really need to get away from this. Consider a sane isGecko approach for the future.
					has.add("ff", parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1]) || undefined);
				}
	
				// IE
				if(document.all && !has("opera")){
					var isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
	
					//In cases where the page has an HTTP header or META tag with
					//X-UA-Compatible, then it is in emulation mode.
					//Make sure isIE reflects the desired version.
					//document.documentMode of 5 means quirks mode.
					//Only switch the value if documentMode's major version
					//is different from isIE's major version.
					var mode = document.documentMode;
					if(mode && mode != 5 && Math.floor(isIE) != mode){
						isIE = mode;
					}
	
					has.add("ie", isIE);
				}
	
				// Wii
				has.add("wii", typeof opera != "undefined" && opera.wiiremote);
			}
		}
	
		return has;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, lang, has){
	// module:
	//		dojo/_base/window
	
	var ret = {
		// summary:
		//		API to save/set/restore the global/document scope.
	
		global: dojo.global,
		/*=====
		 global: {
			 // summary:
			 //		Alias for the current window. 'global' can be modified
			 //		for temporary context shifting. See also withGlobal().
			 // description:
			 //		Use this rather than referring to 'window' to ensure your code runs
			 //		correctly in managed contexts.
		 },
		 =====*/
	
		doc: dojo.global["document"] || null,
		/*=====
		doc: {
			// summary:
			//		Alias for the current document. 'doc' can be modified
			//		for temporary context shifting. See also withDoc().
			// description:
			//		Use this rather than referring to 'window.document' to ensure your code runs
			//		correctly in managed contexts.
			// example:
			//	|	n.appendChild(dojo.doc.createElement('div'));
		},
		=====*/
	
		body: function(/*Document?*/ doc){
			// summary:
			//		Return the body element of the specified document or of dojo/_base/window::doc.
			// example:
			//	|	win.body().appendChild(dojo.doc.createElement('div'));
	
			// Note: document.body is not defined for a strict xhtml document
			// Would like to memoize this, but dojo.doc can change vi dojo.withDoc().
			doc = doc || dojo.doc;
			return doc.body || doc.getElementsByTagName("body")[0]; // Node
		},
	
		setContext: function(/*Object*/ globalObject, /*DocumentElement*/ globalDocument){
			// summary:
			//		changes the behavior of many core Dojo functions that deal with
			//		namespace and DOM lookup, changing them to work in a new global
			//		context (e.g., an iframe). The varibles dojo.global and dojo.doc
			//		are modified as a result of calling this function and the result of
			//		`dojo.body()` likewise differs.
			dojo.global = ret.global = globalObject;
			dojo.doc = ret.doc = globalDocument;
		},
	
		withGlobal: function(	/*Object*/ globalObject,
								/*Function*/ callback,
								/*Object?*/ thisObject,
								/*Array?*/ cbArguments){
			// summary:
			//		Invoke callback with globalObject as dojo.global and
			//		globalObject.document as dojo.doc.
			// description:
			//		Invoke callback with globalObject as dojo.global and
			//		globalObject.document as dojo.doc. If provided, globalObject
			//		will be executed in the context of object thisObject
			//		When callback() returns or throws an error, the dojo.global
			//		and dojo.doc will be restored to its previous state.
	
			var oldGlob = dojo.global;
			try{
				dojo.global = ret.global = globalObject;
				return ret.withDoc.call(null, globalObject.document, callback, thisObject, cbArguments);
			}finally{
				dojo.global = ret.global = oldGlob;
			}
		},
	
		withDoc: function(	/*DocumentElement*/ documentObject,
							/*Function*/ callback,
							/*Object?*/ thisObject,
							/*Array?*/ cbArguments){
			// summary:
			//		Invoke callback with documentObject as dojo/_base/window::doc.
			// description:
			//		Invoke callback with documentObject as dojo/_base/window::doc. If provided,
			//		callback will be executed in the context of object thisObject
			//		When callback() returns or throws an error, the dojo/_base/window::doc will
			//		be restored to its previous state.
	
			var oldDoc = ret.doc,
				oldQ = has("quirks"),
				oldIE = has("ie"), isIE, mode, pwin;
	
			try{
				dojo.doc = ret.doc = documentObject;
				// update dojo.isQuirks and the value of the has feature "quirks".
				// remove setting dojo.isQuirks and dojo.isIE for 2.0
				dojo.isQuirks = has.add("quirks", dojo.doc.compatMode == "BackCompat", true, true); // no need to check for QuirksMode which was Opera 7 only
	
				if(has("ie")){
					if((pwin = documentObject.parentWindow) && pwin.navigator){
						// re-run IE detection logic and update dojo.isIE / has("ie")
						// (the only time parentWindow/navigator wouldn't exist is if we were not
						// passed an actual legitimate document object)
						isIE = parseFloat(pwin.navigator.appVersion.split("MSIE ")[1]) || undefined;
						mode = documentObject.documentMode;
						if(mode && mode != 5 && Math.floor(isIE) != mode){
							isIE = mode;
						}
						dojo.isIE = has.add("ie", isIE, true, true);
					}
				}
	
				if(thisObject && typeof callback == "string"){
					callback = thisObject[callback];
				}
	
				return callback.apply(thisObject, cbArguments || []);
			}finally{
				dojo.doc = ret.doc = oldDoc;
				dojo.isQuirks = has.add("quirks", oldQ, true, true);
				dojo.isIE = has.add("ie", oldIE, true, true);
			}
		}
	};
	
	has("extend-dojo") && lang.mixin(dojo, ret);
	
	return ret;
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(12), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, win, kernel){
		// module:
		//		dojo/dom
	
		// FIXME: need to add unit tests for all the semi-public methods
	
		if(has("ie") <= 7){
			try{
				document.execCommand("BackgroundImageCache", false, true);
			}catch(e){
				// sane browsers don't have cache "issues"
			}
		}
	
		// =============================
		// DOM Functions
		// =============================
	
		// the result object
		var dom = {
			// summary:
			//		This module defines the core dojo DOM API.
		};
	
		if(has("ie")){
			dom.byId = function(id, doc){
				if(typeof id != "string"){
					return id;
				}
				var _d = doc || win.doc, te = id && _d.getElementById(id);
				// attributes.id.value is better than just id in case the
				// user has a name=id inside a form
				if(te && (te.attributes.id.value == id || te.id == id)){
					return te;
				}else{
					var eles = _d.all[id];
					if(!eles || eles.nodeName){
						eles = [eles];
					}
					// if more than 1, choose first with the correct id
					var i = 0;
					while((te = eles[i++])){
						if((te.attributes && te.attributes.id && te.attributes.id.value == id) || te.id == id){
							return te;
						}
					}
				}
			};
		}else{
			dom.byId = function(id, doc){
				// inline'd type check.
				// be sure to return null per documentation, to match IE branch.
				return ((typeof id == "string") ? (doc || win.doc).getElementById(id) : id) || null; // DOMNode
			};
		}
		/*=====
		 dom.byId = function(id, doc){
			// summary:
			//		Returns DOM node with matching `id` attribute or falsy value (ex: null or undefined)
			//		if not found.  If `id` is a DomNode, this function is a no-op.
			//
			// id: String|DOMNode
			//		A string to match an HTML id attribute or a reference to a DOM Node
			//
			// doc: Document?
			//		Document to work in. Defaults to the current value of
			//		dojo/_base/window.doc.  Can be used to retrieve
			//		node references from other documents.
			//
			// example:
			//		Look up a node by ID:
			//	|	require(["dojo/dom"], function(dom){
			//	|		var n = dom.byId("foo");
			//	|	});
			//
			// example:
			//		Check if a node exists, and use it.
			//	|	require(["dojo/dom"], function(dom){
			//	|		var n = dom.byId("bar");
			//	|		if(n){ doStuff() ... }
			//	|	});
			//
			// example:
			//		Allow string or DomNode references to be passed to a custom function:
			//	|	require(["dojo/dom"], function(dom){
			//	|		var foo = function(nodeOrId){
			//	|			nodeOrId = dom.byId(nodeOrId);
			//	|			// ... more stuff
			//	|		}
			//	|	});
		 };
		 =====*/
	
		// Test for DOMNode.contains() method, available everywhere except FF8-
		// and IE8-, where it's available in general, but not on document itself,
		// and also problems when either ancestor or node are text nodes.
	
		var doc = kernel.global["document"] || null;
		has.add("dom-contains", !!(doc && doc.contains));
		dom.isDescendant = has("dom-contains") ?
			// FF9+, IE9+, webkit, opera, iOS, Android, Edge, etc.
			function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
				return !!( (ancestor = dom.byId(ancestor)) && ancestor.contains(dom.byId(node)) );
			} :
			function(/*DOMNode|String*/ node, /*DOMNode|String*/ ancestor){
				// summary:
				//		Returns true if node is a descendant of ancestor
				// node: DOMNode|String
				//		string id or node reference to test
				// ancestor: DOMNode|String
				//		string id or node reference of potential parent to test against
				//
				// example:
				//		Test is node id="bar" is a descendant of node id="foo"
				//	|	require(["dojo/dom"], function(dom){
				//	|		if(dom.isDescendant("bar", "foo")){ ... }
				//	|	});
	
				try{
					node = dom.byId(node);
					ancestor = dom.byId(ancestor);
					while(node){
						if(node == ancestor){
							return true; // Boolean
						}
						node = node.parentNode;
					}
				}catch(e){ /* squelch, return false */ }
				return false; // Boolean
			};
	
		// TODO: do we need setSelectable in the base?
	
		// Add feature test for user-select CSS property
		// (currently known to work in all but IE < 10 and Opera)
		// TODO: The user-select CSS property as of May 2014 is no longer part of
		// any CSS specification. In IE, -ms-user-select does not do the same thing
		// as the unselectable attribute on elements; namely, dijit Editor buttons
		// do not properly prevent the content of the editable content frame from
		// unblurring. As a result, the -ms- prefixed version is omitted here.
		has.add("css-user-select", function(global, doc, element){
			// Avoid exception when dom.js is loaded in non-browser environments
			if(!element){ return false; }
	
			var style = element.style;
			var prefixes = ["Khtml", "O", "Moz", "Webkit"],
				i = prefixes.length,
				name = "userSelect",
				prefix;
	
			// Iterate prefixes from most to least likely
			do{
				if(typeof style[name] !== "undefined"){
					// Supported; return property name
					return name;
				}
			}while(i-- && (name = prefixes[i] + "UserSelect"));
	
			// Not supported if we didn't return before now
			return false;
		});
	
		/*=====
		dom.setSelectable = function(node, selectable){
			// summary:
			//		Enable or disable selection on a node
			// node: DOMNode|String
			//		id or reference to node
			// selectable: Boolean
			//		state to put the node in. false indicates unselectable, true
			//		allows selection.
			// example:
			//		Make the node id="bar" unselectable
			//	|	require(["dojo/dom"], function(dom){
			//	|		dom.setSelectable("bar");
			//	|	});
			// example:
			//		Make the node id="bar" selectable
			//	|	require(["dojo/dom"], function(dom){
			//	|		dom.setSelectable("bar", true);
			//	|	});
		};
		=====*/
	
		var cssUserSelect = has("css-user-select");
		dom.setSelectable = cssUserSelect ? function(node, selectable){
			// css-user-select returns a (possibly vendor-prefixed) CSS property name
			dom.byId(node).style[cssUserSelect] = selectable ? "" : "none";
		} : function(node, selectable){
			node = dom.byId(node);
	
			// (IE < 10 / Opera) Fall back to setting/removing the
			// unselectable attribute on the element and all its children
			var nodes = node.getElementsByTagName("*"),
				i = nodes.length;
	
			if(selectable){
				node.removeAttribute("unselectable");
				while(i--){
					nodes[i].removeAttribute("unselectable");
				}
			}else{
				node.setAttribute("unselectable", "on");
				while(i--){
					nodes[i].setAttribute("unselectable", "on");
				}
			}
		};
	
		return dom;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, dom){
		// module:
		//		dojo/dom-style
	
		// =============================
		// Style Functions
		// =============================
	
		// getComputedStyle drives most of the style code.
		// Wherever possible, reuse the returned object.
		//
		// API functions below that need to access computed styles accept an
		// optional computedStyle parameter.
		// If this parameter is omitted, the functions will call getComputedStyle themselves.
		// This way, calling code can access computedStyle once, and then pass the reference to
		// multiple API functions.
	
		// Although we normally eschew argument validation at this
		// level, here we test argument 'node' for (duck)type,
		// by testing nodeType, ecause 'document' is the 'parentNode' of 'body'
		// it is frequently sent to this function even
		// though it is not Element.
		var getComputedStyle, style = {
			// summary:
			//		This module defines the core dojo DOM style API.
		};
		if(has("webkit")){
			getComputedStyle = function(/*DomNode*/ node){
				var s;
				if(node.nodeType == 1){
					var dv = node.ownerDocument.defaultView;
					s = dv.getComputedStyle(node, null);
					if(!s && node.style){
						node.style.display = "";
						s = dv.getComputedStyle(node, null);
					}
				}
				return s || {};
			};
		}else if(has("ie") && (has("ie") < 9 || has("quirks"))){
			getComputedStyle = function(node){
				// IE (as of 7) doesn't expose Element like sane browsers
				// currentStyle can be null on IE8!
				return node.nodeType == 1 /* ELEMENT_NODE*/ && node.currentStyle ? node.currentStyle : {};
			};
		}else{
			getComputedStyle = function(node){
				return node.nodeType == 1 /* ELEMENT_NODE*/ ?
					node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
			};
		}
		style.getComputedStyle = getComputedStyle;
		/*=====
		style.getComputedStyle = function(node){
			// summary:
			//		Returns a "computed style" object.
			//
			// description:
			//		Gets a "computed style" object which can be used to gather
			//		information about the current state of the rendered node.
			//
			//		Note that this may behave differently on different browsers.
			//		Values may have different formats and value encodings across
			//		browsers.
			//
			//		Note also that this method is expensive.  Wherever possible,
			//		reuse the returned object.
			//
			//		Use the dojo/dom-style.get() method for more consistent (pixelized)
			//		return values.
			//
			// node: DOMNode
			//		A reference to a DOM node. Does NOT support taking an
			//		ID string for speed reasons.
			// example:
			//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
			//	|		domStyle.getComputedStyle(dom.byId('foo')).borderWidth;
			//	|	});
			//
			// example:
			//		Reusing the returned object, avoiding multiple lookups:
			//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
			//	|		var cs = domStyle.getComputedStyle(dom.byId("someNode"));
			//	|		var w = cs.width, h = cs.height;
			//	|	});
			return; // CSS2Properties
		};
		=====*/
	
		var toPixel;
		if(!has("ie")){
			toPixel = function(element, value){
				// style values can be floats, client code may want
				// to round for integer pixels.
				return parseFloat(value) || 0;
			};
		}else{
			toPixel = function(element, avalue){
				if(!avalue){ return 0; }
				// on IE7, medium is usually 4 pixels
				if(avalue == "medium"){ return 4; }
				// style values can be floats, client code may
				// want to round this value for integer pixels.
				if(avalue.slice && avalue.slice(-2) == 'px'){ return parseFloat(avalue); }
				var s = element.style, rs = element.runtimeStyle, cs = element.currentStyle,
					sLeft = s.left, rsLeft = rs.left;
				rs.left = cs.left;
				try{
					// 'avalue' may be incompatible with style.left, which can cause IE to throw
					// this has been observed for border widths using "thin", "medium", "thick" constants
					// those particular constants could be trapped by a lookup
					// but perhaps there are more
					s.left = avalue;
					avalue = s.pixelLeft;
				}catch(e){
					avalue = 0;
				}
				s.left = sLeft;
				rs.left = rsLeft;
				return avalue;
			};
		}
		style.toPixelValue = toPixel;
		/*=====
		style.toPixelValue = function(node, value){
			// summary:
			//		converts style value to pixels on IE or return a numeric value.
			// node: DOMNode
			// value: String
			// returns: Number
		};
		=====*/
	
		// FIXME: there opacity quirks on FF that we haven't ported over. Hrm.
	
		var astr = "DXImageTransform.Microsoft.Alpha";
		var af = function(n, f){
			try{
				return n.filters.item(astr);
			}catch(e){
				return f ? {} : null;
			}
		};
	
		var _getOpacity =
			has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function(node){
				try{
					return af(node).Opacity / 100; // Number
				}catch(e){
					return 1; // Number
				}
			} :
			function(node){
				return getComputedStyle(node).opacity;
			};
	
		var _setOpacity =
			has("ie") < 9 || (has("ie") < 10 && has("quirks")) ? function(/*DomNode*/ node, /*Number*/ opacity){
				if(opacity === ""){ opacity = 1; }
				var ov = opacity * 100, fullyOpaque = opacity === 1;
	
				// on IE7 Alpha(Filter opacity=100) makes text look fuzzy so disable it altogether (bug #2661),
				// but still update the opacity value so we can get a correct reading if it is read later:
				// af(node, 1).Enabled = !fullyOpaque;
	
				if(fullyOpaque){
					node.style.zoom = "";
					if(af(node)){
						node.style.filter = node.style.filter.replace(
							new RegExp("\\s*progid:" + astr + "\\([^\\)]+?\\)", "i"), "");
					}
				}else{
					node.style.zoom = 1;
					if(af(node)){
						af(node, 1).Opacity = ov;
					}else{
						node.style.filter += " progid:" + astr + "(Opacity=" + ov + ")";
					}
					af(node, 1).Enabled = true;
				}
	
				if(node.tagName.toLowerCase() == "tr"){
					for(var td = node.firstChild; td; td = td.nextSibling){
						if(td.tagName.toLowerCase() == "td"){
							_setOpacity(td, opacity);
						}
					}
				}
				return opacity;
			} :
			function(node, opacity){
				return node.style.opacity = opacity;
			};
	
		var _pixelNamesCache = {
			left: true, top: true
		};
		var _pixelRegExp = /margin|padding|width|height|max|min|offset/; // |border
		function _toStyleValue(node, type, value){
			//TODO: should we really be doing string case conversion here? Should we cache it? Need to profile!
			type = type.toLowerCase();
	
			// Adjustments for IE and Edge
			if(value == "auto"){
				if(type == "height"){ return node.offsetHeight; }
				if(type == "width"){ return node.offsetWidth; }
			}
			if(type == "fontweight"){
				switch(value){
					case 700: return "bold";
					case 400:
					default: return "normal";
				}
			}
	
			if(!(type in _pixelNamesCache)){
				_pixelNamesCache[type] = _pixelRegExp.test(type);
			}
			return _pixelNamesCache[type] ? toPixel(node, value) : value;
		}
	
		var _floatAliases = {cssFloat: 1, styleFloat: 1, "float": 1};
	
		// public API
	
		style.get = function getStyle(/*DOMNode|String*/ node, /*String?*/ name){
			// summary:
			//		Accesses styles on a node.
			// description:
			//		Getting the style value uses the computed style for the node, so the value
			//		will be a calculated value, not just the immediate node.style value.
			//		Also when getting values, use specific style names,
			//		like "borderBottomWidth" instead of "border" since compound values like
			//		"border" are not necessarily reflected as expected.
			//		If you want to get node dimensions, use `dojo/dom-geometry.getMarginBox()`,
			//		`dojo/dom-geometry.getContentBox()` or `dojo/dom-geometry.getPosition()`.
			// node: DOMNode|String
			//		id or reference to node to get style for
			// name: String?
			//		the style property to get
			// example:
			//		Passing only an ID or node returns the computed style object of
			//		the node:
			//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
			//	|		domStyle.get("thinger");
			//	|	});
			// example:
			//		Passing a node and a style property returns the current
			//		normalized, computed value for that property:
			//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
			//	|		domStyle.get("thinger", "opacity"); // 1 by default
			//	|	});
	
			var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
			if(l == 2 && op){
				return _getOpacity(n);
			}
			name = _floatAliases[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
			var s = style.getComputedStyle(n);
			return (l == 1) ? s : _toStyleValue(n, name, s[name] || n.style[name]); /* CSS2Properties||String||Number */
		};
	
		style.set = function setStyle(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
			// summary:
			//		Sets styles on a node.
			// node: DOMNode|String
			//		id or reference to node to set style for
			// name: String|Object
			//		the style property to set in DOM-accessor format
			//		("borderWidth", not "border-width") or an object with key/value
			//		pairs suitable for setting each property.
			// value: String?
			//		If passed, sets value on the node for style, handling
			//		cross-browser concerns.  When setting a pixel value,
			//		be sure to include "px" in the value. For instance, top: "200px".
			//		Otherwise, in some cases, some browsers will not apply the style.
			//
			// example:
			//		Passing a node, a style property, and a value changes the
			//		current display of the node and returns the new computed value
			//	|	require(["dojo/dom-style"], function(domStyle){
			//	|		domStyle.set("thinger", "opacity", 0.5); // == 0.5
			//	|	});
			//
			// example:
			//		Passing a node, an object-style style property sets each of the values in turn and returns the computed style object of the node:
			//	|	require(["dojo/dom-style"], function(domStyle){
			//	|		domStyle.set("thinger", {
			//	|			"opacity": 0.5,
			//	|			"border": "3px solid black",
			//	|			"height": "300px"
			//	|		});
			//	|	});
			//
			// example:
			//		When the CSS style property is hyphenated, the JavaScript property is camelCased.
			//		font-size becomes fontSize, and so on.
			//	|	require(["dojo/dom-style", "dojo/dom"], function(domStyle, dom){
			//	|		domStyle.set("thinger",{
			//	|			fontSize:"14pt",
			//	|			letterSpacing:"1.2em"
			//	|		});
			//	|	});
			//
			// example:
			//		dojo/NodeList implements .style() using the same syntax, omitting the "node" parameter, calling
			//		dojo/dom-style.get() on every element of the list. See: `dojo/query` and `dojo/NodeList`
			//	|	require(["dojo/dom-style", "dojo/query", "dojo/NodeList-dom"],
			//	|	function(domStyle, query){
			//	|		query(".someClassName").style("visibility","hidden");
			//	|		// or
			//	|		query("#baz > div").style({
			//	|			opacity:0.75,
			//	|			fontSize:"13pt"
			//	|		});
			//	|	});
	
			var n = dom.byId(node), l = arguments.length, op = (name == "opacity");
			name = _floatAliases[name] ? "cssFloat" in n.style ? "cssFloat" : "styleFloat" : name;
			if(l == 3){
				return op ? _setOpacity(n, value) : n.style[name] = value; // Number
			}
			for(var x in name){
				style.set(node, x, name[x]);
			}
			return style.getComputedStyle(n);
		};
	
		return style;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19), __webpack_require__(2), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(aspect, dojo, has){
	
		"use strict";
		if(has("dom")){ // check to make sure we are in a browser, this module should work anywhere
			var major = window.ScriptEngineMajorVersion;
			has.add("jscript", major && (major() + ScriptEngineMinorVersion() / 10));
			has.add("event-orientationchange", has("touch") && !has("android")); // TODO: how do we detect this?
			has.add("event-stopimmediatepropagation", window.Event && !!window.Event.prototype && !!window.Event.prototype.stopImmediatePropagation);
			has.add("event-focusin", function(global, doc, element){
				return 'onfocusin' in element;
			});
	
			if(has("touch")){
				has.add("touch-can-modify-event-delegate", function(){
					// This feature test checks whether deleting a property of an event delegate works
					// for a touch-enabled device. If it works, event delegation can be used as fallback
					// for browsers such as Safari in older iOS where deleting properties of the original
					// event does not work.
					var EventDelegate = function(){};
					EventDelegate.prototype =
						document.createEvent("MouseEvents"); // original event
					// Attempt to modify a property of an event delegate and check if
					// it succeeds. Depending on browsers and on whether dojo/on's
					// strict mode is stripped in a Dojo build, there are 3 known behaviors:
					// it may either succeed, or raise an error, or fail to set the property
					// without raising an error.
					try{
						var eventDelegate = new EventDelegate;
						eventDelegate.target = null;
						return eventDelegate.target === null;
					}catch(e){
						return false; // cannot use event delegation
					}
				});
			}
		}
		var on = function(target, type, listener, dontFix){
			// summary:
			//		A function that provides core event listening functionality. With this function
			//		you can provide a target, event type, and listener to be notified of
			//		future matching events that are fired.
			// target: Element|Object
			//		This is the target object or DOM element that to receive events from
			// type: String|Function
			//		This is the name of the event to listen for or an extension event type.
			// listener: Function
			//		This is the function that should be called when the event fires.
			// returns: Object
			//		An object with a remove() method that can be used to stop listening for this
			//		event.
			// description:
			//		To listen for "click" events on a button node, we can do:
			//		|	define(["dojo/on"], function(on){
			//		|		on(button, "click", clickHandler);
			//		|		...
			//		Evented JavaScript objects can also have their own events.
			//		|	var obj = new Evented;
			//		|	on(obj, "foo", fooHandler);
			//		And then we could publish a "foo" event:
			//		|	on.emit(obj, "foo", {key: "value"});
			//		We can use extension events as well. For example, you could listen for a tap gesture:
			//		|	define(["dojo/on", "dojo/gesture/tap", function(on, tap){
			//		|		on(button, tap, tapHandler);
			//		|		...
			//		which would trigger fooHandler. Note that for a simple object this is equivalent to calling:
			//		|	obj.onfoo({key:"value"});
			//		If you use on.emit on a DOM node, it will use native event dispatching when possible.
	
			if(typeof target.on == "function" && typeof type != "function" && !target.nodeType){
				// delegate to the target's on() method, so it can handle it's own listening if it wants (unless it
				// is DOM node and we may be dealing with jQuery or Prototype's incompatible addition to the
				// Element prototype
				return target.on(type, listener);
			}
			// delegate to main listener code
			return on.parse(target, type, listener, addListener, dontFix, this);
		};
		on.pausable =  function(target, type, listener, dontFix){
			// summary:
			//		This function acts the same as on(), but with pausable functionality. The
			//		returned signal object has pause() and resume() functions. Calling the
			//		pause() method will cause the listener to not be called for future events. Calling the
			//		resume() method will cause the listener to again be called for future events.
			var paused;
			var signal = on(target, type, function(){
				if(!paused){
					return listener.apply(this, arguments);
				}
			}, dontFix);
			signal.pause = function(){
				paused = true;
			};
			signal.resume = function(){
				paused = false;
			};
			return signal;
		};
		on.once = function(target, type, listener, dontFix){
			// summary:
			//		This function acts the same as on(), but will only call the listener once. The
			//		listener will be called for the first
			//		event that takes place and then listener will automatically be removed.
			var signal = on(target, type, function(){
				// remove this listener
				signal.remove();
				// proceed to call the listener
				return listener.apply(this, arguments);
			});
			return signal;
		};
		on.parse = function(target, type, listener, addListener, dontFix, matchesTarget){
			var events;
			if(type.call){
				// event handler function
				// on(node, touch.press, touchListener);
				return type.call(matchesTarget, target, listener);
			}
	
			if(type instanceof Array){
				// allow an array of event names (or event handler functions)
				events = type;
			}else if(type.indexOf(",") > -1){
				// we allow comma delimited event names, so you can register for multiple events at once
				events = type.split(/\s*,\s*/);
			}
			if(events){
				var handles = [];
				var i = 0;
				var eventName;
				while(eventName = events[i++]){ // intentional assignment
					handles.push(on.parse(target, eventName, listener, addListener, dontFix, matchesTarget));
				}
				handles.remove = function(){
					for(var i = 0; i < handles.length; i++){
						handles[i].remove();
					}
				};
				return handles;
			}
			return addListener(target, type, listener, dontFix, matchesTarget);
		};
		var touchEvents = /^touch/;
		function addListener(target, type, listener, dontFix, matchesTarget){
			// event delegation:
			var selector = type.match(/(.*):(.*)/);
			// if we have a selector:event, the last one is interpreted as an event, and we use event delegation
			if(selector){
				type = selector[2];
				selector = selector[1];
				// create the extension event for selectors and directly call it
				return on.selector(selector, type).call(matchesTarget, target, listener);
			}
			// test to see if it a touch event right now, so we don't have to do it every time it fires
			if(has("touch")){
				if(touchEvents.test(type)){
					// touch event, fix it
					listener = fixTouchListener(listener);
				}
				if(!has("event-orientationchange") && (type == "orientationchange")){
					//"orientationchange" not supported <= Android 2.1,
					//but works through "resize" on window
					type = "resize";
					target = window;
					listener = fixTouchListener(listener);
				}
			}
			if(addStopImmediate){
				// add stopImmediatePropagation if it doesn't exist
				listener = addStopImmediate(listener);
			}
			// normal path, the target is |this|
			if(target.addEventListener){
				// the target has addEventListener, which should be used if available (might or might not be a node, non-nodes can implement this method as well)
				// check for capture conversions
				var capture = type in captures,
					adjustedType = capture ? captures[type] : type;
				target.addEventListener(adjustedType, listener, capture);
				// create and return the signal
				return {
					remove: function(){
						target.removeEventListener(adjustedType, listener, capture);
					}
				};
			}
			type = "on" + type;
			if(fixAttach && target.attachEvent){
				return fixAttach(target, type, listener);
			}
			throw new Error("Target must be an event emitter");
		}
		on.matches = function(node, selector, context, children, matchesTarget) {
			// summary:
			//		Check if a node match the current selector within the constraint of a context
			// node: DOMNode
			//		The node that originate the event
			// selector: String
			//		The selector to check against
			// context: DOMNode
			//		The context to search in.
			// children: Boolean
			//		Indicates if children elements of the selector should be allowed. This defaults to
			//		true
			// matchesTarget: Object|dojo/query?
			//		An object with a property "matches" as a function. Default is dojo/query.
			//		Matching DOMNodes will be done against this function
			//		The function must return a Boolean.
			//		It will have 3 arguments: "node", "selector" and "context"
			//		True is expected if "node" is matching the current "selector" in the passed "context"
			// returns: DOMNode?
			//		The matching node, if any. Else you get false
	
			// see if we have a valid matchesTarget or default to dojo/query
			matchesTarget = matchesTarget && (typeof matchesTarget.matches == "function") ? matchesTarget : dojo.query;
			children = children !== false;
			// there is a selector, so make sure it matches
			if(node.nodeType != 1){
				// text node will fail in native match selector
				node = node.parentNode;
			}
			while(!matchesTarget.matches(node, selector, context)){
				if(node == context || children === false || !(node = node.parentNode) || node.nodeType != 1){ // intentional assignment
					return false;
				}
			}
			return node;
		};
		on.selector = function(selector, eventType, children){
			// summary:
			//		Creates a new extension event with event delegation. This is based on
			//		the provided event type (can be extension event) that
			//		only calls the listener when the CSS selector matches the target of the event.
			//
			//		The application must require() an appropriate level of dojo/query to handle the selector.
			// selector:
			//		The CSS selector to use for filter events and determine the |this| of the event listener.
			// eventType:
			//		The event to listen for
			// children:
			//		Indicates if children elements of the selector should be allowed. This defaults to
			//		true
			// example:
			// |	require(["dojo/on", "dojo/mouse", "dojo/query!css2"], function(on, mouse){
			// |		on(node, on.selector(".my-class", mouse.enter), handlerForMyHover);
			return function(target, listener){
				// if the selector is function, use it to select the node, otherwise use the matches method
				var matchesTarget = typeof selector == "function" ? {matches: selector} : this,
					bubble = eventType.bubble;
				function select(eventTarget){
					return on.matches(eventTarget, selector, target, children, matchesTarget);
				}
				if(bubble){
					// the event type doesn't naturally bubble, but has a bubbling form, use that, and give it the selector so it can perform the select itself
					return on(target, bubble(select), listener);
				}
				// standard event delegation
				return on(target, eventType, function(event){
					// call select to see if we match
					var eventTarget = select(event.target);
					// if it matches we call the listener
					if (eventTarget) {
						// We save the matching target into the event, so it can be accessed even when hitching (see #18355)
						event.selectorTarget = eventTarget;
						return listener.call(eventTarget, event);
					}
				});
			};
		};
	
		function syntheticPreventDefault(){
			this.cancelable = false;
			this.defaultPrevented = true;
		}
		function syntheticStopPropagation(){
			this.bubbles = false;
		}
		var slice = [].slice,
			syntheticDispatch = on.emit = function(target, type, event){
			// summary:
			//		Fires an event on the target object.
			// target:
			//		The target object to fire the event on. This can be a DOM element or a plain
			//		JS object. If the target is a DOM element, native event emitting mechanisms
			//		are used when possible.
			// type:
			//		The event type name. You can emulate standard native events like "click" and
			//		"mouseover" or create custom events like "open" or "finish".
			// event:
			//		An object that provides the properties for the event. See https://developer.mozilla.org/en/DOM/event.initEvent
			//		for some of the properties. These properties are copied to the event object.
			//		Of particular importance are the cancelable and bubbles properties. The
			//		cancelable property indicates whether or not the event has a default action
			//		that can be cancelled. The event is cancelled by calling preventDefault() on
			//		the event object. The bubbles property indicates whether or not the
			//		event will bubble up the DOM tree. If bubbles is true, the event will be called
			//		on the target and then each parent successively until the top of the tree
			//		is reached or stopPropagation() is called. Both bubbles and cancelable
			//		default to false.
			// returns:
			//		If the event is cancelable and the event is not cancelled,
			//		emit will return true. If the event is cancelable and the event is cancelled,
			//		emit will return false.
			// details:
			//		Note that this is designed to emit events for listeners registered through
			//		dojo/on. It should actually work with any event listener except those
			//		added through IE's attachEvent (IE8 and below's non-W3C event emitting
			//		doesn't support custom event types). It should work with all events registered
			//		through dojo/on. Also note that the emit method does do any default
			//		action, it only returns a value to indicate if the default action should take
			//		place. For example, emitting a keypress event would not cause a character
			//		to appear in a textbox.
			// example:
			//		To fire our own click event
			//	|	require(["dojo/on", "dojo/dom"
			//	|	], function(on, dom){
			//	|		on.emit(dom.byId("button"), "click", {
			//	|			cancelable: true,
			//	|			bubbles: true,
			//	|			screenX: 33,
			//	|			screenY: 44
			//	|		});
			//		We can also fire our own custom events:
			//	|		on.emit(dom.byId("slider"), "slide", {
			//	|			cancelable: true,
			//	|			bubbles: true,
			//	|			direction: "left-to-right"
			//	|		});
			//	|	});
			var args = slice.call(arguments, 2);
			var method = "on" + type;
			if("parentNode" in target){
				// node (or node-like), create event controller methods
				var newEvent = args[0] = {};
				for(var i in event){
					newEvent[i] = event[i];
				}
				newEvent.preventDefault = syntheticPreventDefault;
				newEvent.stopPropagation = syntheticStopPropagation;
				newEvent.target = target;
				newEvent.type = type;
				event = newEvent;
			}
			do{
				// call any node which has a handler (note that ideally we would try/catch to simulate normal event propagation but that causes too much pain for debugging)
				target[method] && target[method].apply(target, args);
				// and then continue up the parent node chain if it is still bubbling (if started as bubbles and stopPropagation hasn't been called)
			}while(event && event.bubbles && (target = target.parentNode));
			return event && event.cancelable && event; // if it is still true (was cancelable and was cancelled), return the event to indicate default action should happen
		};
		var captures = has("event-focusin") ? {} : {focusin: "focus", focusout: "blur"};
		if(!has("event-stopimmediatepropagation")){
			var stopImmediatePropagation =function(){
				this.immediatelyStopped = true;
				this.modified = true; // mark it as modified so the event will be cached in IE
			};
			var addStopImmediate = function(listener){
				return function(event){
					if(!event.immediatelyStopped){// check to make sure it hasn't been stopped immediately
						event.stopImmediatePropagation = stopImmediatePropagation;
						return listener.apply(this, arguments);
					}
				};
			};
		}
		if(has("dom-addeventlistener")){
			// emitter that works with native event handling
			on.emit = function(target, type, event){
				if(target.dispatchEvent && document.createEvent){
					// use the native event emitting mechanism if it is available on the target object
					// create a generic event
					// we could create branch into the different types of event constructors, but
					// that would be a lot of extra code, with little benefit that I can see, seems
					// best to use the generic constructor and copy properties over, making it
					// easy to have events look like the ones created with specific initializers
					var ownerDocument = target.ownerDocument || document;
					var nativeEvent = ownerDocument.createEvent("HTMLEvents");
					nativeEvent.initEvent(type, !!event.bubbles, !!event.cancelable);
					// and copy all our properties over
					for(var i in event){
						if(!(i in nativeEvent)){
							nativeEvent[i] = event[i];
						}
					}
					return target.dispatchEvent(nativeEvent) && nativeEvent;
				}
				return syntheticDispatch.apply(on, arguments); // emit for a non-node
			};
		}else{
			// no addEventListener, basically old IE event normalization
			on._fixEvent = function(evt, sender){
				// summary:
				//		normalizes properties on the event object including event
				//		bubbling methods, keystroke normalization, and x/y positions
				// evt:
				//		native event object
				// sender:
				//		node to treat as "currentTarget"
				if(!evt){
					var w = sender && (sender.ownerDocument || sender.document || sender).parentWindow || window;
					evt = w.event;
				}
				if(!evt){return evt;}
				try{
					if(lastEvent && evt.type == lastEvent.type  && evt.srcElement == lastEvent.target){
						// should be same event, reuse event object (so it can be augmented);
						// accessing evt.srcElement rather than evt.target since evt.target not set on IE until fixup below
						evt = lastEvent;
					}
				}catch(e){
					// will occur on IE on lastEvent.type reference if lastEvent points to a previous event that already
					// finished bubbling, but the setTimeout() to clear lastEvent hasn't fired yet
				}
				if(!evt.target){ // check to see if it has been fixed yet
					evt.target = evt.srcElement;
					evt.currentTarget = (sender || evt.srcElement);
					if(evt.type == "mouseover"){
						evt.relatedTarget = evt.fromElement;
					}
					if(evt.type == "mouseout"){
						evt.relatedTarget = evt.toElement;
					}
					if(!evt.stopPropagation){
						evt.stopPropagation = stopPropagation;
						evt.preventDefault = preventDefault;
					}
					switch(evt.type){
						case "keypress":
							var c = ("charCode" in evt ? evt.charCode : evt.keyCode);
							if (c==10){
								// CTRL-ENTER is CTRL-ASCII(10) on IE, but CTRL-ENTER on Mozilla
								c=0;
								evt.keyCode = 13;
							}else if(c==13||c==27){
								c=0; // Mozilla considers ENTER and ESC non-printable
							}else if(c==3){
								c=99; // Mozilla maps CTRL-BREAK to CTRL-c
							}
							// Mozilla sets keyCode to 0 when there is a charCode
							// but that stops the event on IE.
							evt.charCode = c;
							_setKeyChar(evt);
							break;
					}
				}
				return evt;
			};
			var lastEvent, IESignal = function(handle){
				this.handle = handle;
			};
			IESignal.prototype.remove = function(){
				delete _dojoIEListeners_[this.handle];
			};
			var fixListener = function(listener){
				// this is a minimal function for closing on the previous listener with as few as variables as possible
				return function(evt){
					evt = on._fixEvent(evt, this);
					var result = listener.call(this, evt);
					if(evt.modified){
						// cache the last event and reuse it if we can
						if(!lastEvent){
							setTimeout(function(){
								lastEvent = null;
							});
						}
						lastEvent = evt;
					}
					return result;
				};
			};
			var fixAttach = function(target, type, listener){
				listener = fixListener(listener);
				if(((target.ownerDocument ? target.ownerDocument.parentWindow : target.parentWindow || target.window || window) != top ||
							has("jscript") < 5.8) &&
						!has("config-_allow_leaks")){
					// IE will leak memory on certain handlers in frames (IE8 and earlier) and in unattached DOM nodes for JScript 5.7 and below.
					// Here we use global redirection to solve the memory leaks
					if(typeof _dojoIEListeners_ == "undefined"){
						_dojoIEListeners_ = [];
					}
					var emitter = target[type];
					if(!emitter || !emitter.listeners){
						var oldListener = emitter;
						emitter = Function('event', 'var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}');
						emitter.listeners = [];
						target[type] = emitter;
						emitter.global = this;
						if(oldListener){
							emitter.listeners.push(_dojoIEListeners_.push(oldListener) - 1);
						}
					}
					var handle;
					emitter.listeners.push(handle = (emitter.global._dojoIEListeners_.push(listener) - 1));
					return new IESignal(handle);
				}
				return aspect.after(target, type, listener, true);
			};
	
			var _setKeyChar = function(evt){
				evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : '';
				evt.charOrCode = evt.keyChar || evt.keyCode;	// TODO: remove for 2.0
			};
			// Called in Event scope
			var stopPropagation = function(){
				this.cancelBubble = true;
			};
			var preventDefault = on._preventDefault = function(){
				// Setting keyCode to 0 is the only way to prevent certain keypresses (namely
				// ctrl-combinations that correspond to menu accelerator keys).
				// Otoh, it prevents upstream listeners from getting this information
				// Try to split the difference here by clobbering keyCode only for ctrl
				// combinations. If you still need to access the key upstream, bubbledKeyCode is
				// provided as a workaround.
				this.bubbledKeyCode = this.keyCode;
				if(this.ctrlKey){
					try{
						// squelch errors when keyCode is read-only
						// (e.g. if keyCode is ctrl or shift)
						this.keyCode = 0;
					}catch(e){
					}
				}
				this.defaultPrevented = true;
				this.returnValue = false;
				this.modified = true; // mark it as modified  (for defaultPrevented flag) so the event will be cached in IE
			};
		}
		if(has("touch")){
			var EventDelegate = function(){};
			var windowOrientation = window.orientation;
			var fixTouchListener = function(listener){
				return function(originalEvent){
					//Event normalization(for ontouchxxx and resize):
					//1.incorrect e.pageX|pageY in iOS
					//2.there are no "e.rotation", "e.scale" and "onorientationchange" in Android
					//3.More TBD e.g. force | screenX | screenX | clientX | clientY | radiusX | radiusY
	
					// see if it has already been corrected
					var event = originalEvent.corrected;
					if(!event){
						var type = originalEvent.type;
						try{
							delete originalEvent.type; // on some JS engines (android), deleting properties makes them mutable
						}catch(e){}
						if(originalEvent.type){
							// Deleting the property of the original event did not work (this is the case of
							// browsers such as older Safari iOS), hence fallback:
							if(has("touch-can-modify-event-delegate")){
								// If deleting properties of delegated event works, use event delegation:
								EventDelegate.prototype = originalEvent;
								event = new EventDelegate;
							}else{
								// Otherwise last fallback: other browsers, such as mobile Firefox, do not like
								// delegated properties, so we have to copy
								event = {};
								for(var name in originalEvent){
									event[name] = originalEvent[name];
								}
							}
							// have to delegate methods to make them work
							event.preventDefault = function(){
								originalEvent.preventDefault();
							};
							event.stopPropagation = function(){
								originalEvent.stopPropagation();
							};
						}else{
							// deletion worked, use property as is
							event = originalEvent;
							event.type = type;
						}
						originalEvent.corrected = event;
						if(type == 'resize'){
							if(windowOrientation == window.orientation){
								return null;//double tap causes an unexpected 'resize' in Android
							}
							windowOrientation = window.orientation;
							event.type = "orientationchange";
							return listener.call(this, event);
						}
						// We use the original event and augment, rather than doing an expensive mixin operation
						if(!("rotation" in event)){ // test to see if it has rotation
							event.rotation = 0;
							event.scale = 1;
						}
						//use event.changedTouches[0].pageX|pageY|screenX|screenY|clientX|clientY|target
						var firstChangeTouch = event.changedTouches[0];
						for(var i in firstChangeTouch){ // use for-in, we don't need to have dependency on dojo/_base/lang here
							delete event[i]; // delete it first to make it mutable
							event[i] = firstChangeTouch[i];
						}
					}
					return listener.call(this, event);
				};
			};
		}
		return on;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){
	
		// module:
		//		dojo/aspect
	
		"use strict";
		var undefined;
		function advise(dispatcher, type, advice, receiveArguments){
			var previous = dispatcher[type];
			var around = type == "around";
			var signal;
			if(around){
				var advised = advice(function(){
					return previous.advice(this, arguments);
				});
				signal = {
					remove: function(){
						if(advised){
							advised = dispatcher = advice = null;
						}
					},
					advice: function(target, args){
						return advised ?
							advised.apply(target, args) :  // called the advised function
							previous.advice(target, args); // cancelled, skip to next one
					}
				};
			}else{
				// create the remove handler
				signal = {
					remove: function(){
						if(signal.advice){
							var previous = signal.previous;
							var next = signal.next;
							if(!next && !previous){
								delete dispatcher[type];
							}else{
								if(previous){
									previous.next = next;
								}else{
									dispatcher[type] = next;
								}
								if(next){
									next.previous = previous;
								}
							}
	
							// remove the advice to signal that this signal has been removed
							dispatcher = advice = signal.advice = null;
						}
					},
					id: dispatcher.nextId++,
					advice: advice,
					receiveArguments: receiveArguments
				};
			}
			if(previous && !around){
				if(type == "after"){
					// add the listener to the end of the list
					// note that we had to change this loop a little bit to workaround a bizarre IE10 JIT bug
					while(previous.next && (previous = previous.next)){}
					previous.next = signal;
					signal.previous = previous;
				}else if(type == "before"){
					// add to beginning
					dispatcher[type] = signal;
					signal.next = previous;
					previous.previous = signal;
				}
			}else{
				// around or first one just replaces
				dispatcher[type] = signal;
			}
			return signal;
		}
		function aspect(type){
			return function(target, methodName, advice, receiveArguments){
				var existing = target[methodName], dispatcher;
				if(!existing || existing.target != target){
					// no dispatcher in place
					target[methodName] = dispatcher = function(){
						var executionId = dispatcher.nextId;
						// before advice
						var args = arguments;
						var before = dispatcher.before;
						while(before){
							if(before.advice){
								args = before.advice.apply(this, args) || args;
							}
							before = before.next;
						}
						// around advice
						if(dispatcher.around){
							var results = dispatcher.around.advice(this, args);
						}
						// after advice
						var after = dispatcher.after;
						while(after && after.id < executionId){
							if(after.advice){
								if(after.receiveArguments){
									var newResults = after.advice.apply(this, args);
									// change the return value only if a new value was returned
									results = newResults === undefined ? results : newResults;
								}else{
									results = after.advice.call(this, results, args);
								}
							}
							after = after.next;
						}
						return results;
					};
					if(existing){
						dispatcher.around = {advice: function(target, args){
							return existing.apply(target, args);
						}};
					}
					dispatcher.target = target;
					dispatcher.nextId = dispatcher.nextId || 0;
				}
				var results = advise((dispatcher || existing), type, advice, receiveArguments);
				advice = null;
				return results;
			};
		}
	
		// TODOC: after/before/around return object
	
		var after = aspect("after");
		/*=====
		after = function(target, methodName, advice, receiveArguments){
			// summary:
			//		The "after" export of the aspect module is a function that can be used to attach
			//		"after" advice to a method. This function will be executed after the original method
			//		is executed. By default the function will be called with a single argument, the return
			//		value of the original method, or the the return value of the last executed advice (if a previous one exists).
			//		The fourth (optional) argument can be set to true to so the function receives the original
			//		arguments (from when the original method was called) rather than the return value.
			//		If there are multiple "after" advisors, they are executed in the order they were registered.
			// target: Object
			//		This is the target object
			// methodName: String
			//		This is the name of the method to attach to.
			// advice: Function
			//		This is function to be called after the original method
			// receiveArguments: Boolean?
			//		If this is set to true, the advice function receives the original arguments (from when the original mehtod
			//		was called) rather than the return value of the original/previous method.
			// returns:
			//		A signal object that can be used to cancel the advice. If remove() is called on this signal object, it will
			//		stop the advice function from being executed.
		};
		=====*/
	
		var before = aspect("before");
		/*=====
		before = function(target, methodName, advice){
			// summary:
			//		The "before" export of the aspect module is a function that can be used to attach
			//		"before" advice to a method. This function will be executed before the original method
			//		is executed. This function will be called with the arguments used to call the method.
			//		This function may optionally return an array as the new arguments to use to call
			//		the original method (or the previous, next-to-execute before advice, if one exists).
			//		If the before method doesn't return anything (returns undefined) the original arguments
			//		will be preserved.
			//		If there are multiple "before" advisors, they are executed in the reverse order they were registered.
			// target: Object
			//		This is the target object
			// methodName: String
			//		This is the name of the method to attach to.
			// advice: Function
			//		This is function to be called before the original method
		};
		=====*/
	
		var around = aspect("around");
		/*=====
		 around = function(target, methodName, advice){
			// summary:
			//		The "around" export of the aspect module is a function that can be used to attach
			//		"around" advice to a method. The advisor function is immediately executed when
			//		the around() is called, is passed a single argument that is a function that can be
			//		called to continue execution of the original method (or the next around advisor).
			//		The advisor function should return a function, and this function will be called whenever
			//		the method is called. It will be called with the arguments used to call the method.
			//		Whatever this function returns will be returned as the result of the method call (unless after advise changes it).
			// example:
			//		If there are multiple "around" advisors, the most recent one is executed first,
			//		which can then delegate to the next one and so on. For example:
			//		|	around(obj, "foo", function(originalFoo){
			//		|		return function(){
			//		|			var start = new Date().getTime();
			//		|			var results = originalFoo.apply(this, arguments); // call the original
			//		|			var end = new Date().getTime();
			//		|			console.log("foo execution took " + (end - start) + " ms");
			//		|			return results;
			//		|		};
			//		|	});
			// target: Object
			//		This is the target object
			// methodName: String
			//		This is the name of the method to attach to.
			// advice: Function
			//		This is function to be called around the original method
		};
		=====*/
	
		return {
			// summary:
			//		provides aspect oriented programming functionality, allowing for
			//		one to add before, around, or after advice on existing methods.
			// example:
			//	|	define(["dojo/aspect"], function(aspect){
			//	|		var signal = aspect.after(targetObject, "methodName", function(someArgument){
			//	|			this will be called when targetObject.methodName() is called, after the original function is called
			//	|		});
			//
			// example:
			//	The returned signal object can be used to cancel the advice.
			//	|	signal.remove(); // this will stop the advice from being executed anymore
			//	|	aspect.before(targetObject, "methodName", function(someArgument){
			//	|		// this will be called when targetObject.methodName() is called, before the original function is called
			//	|	 });
	
			before: before,
			around: around,
			after: after
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(19), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function(aspect, on){
		// module:
		//		dojo/Evented
	
	 	"use strict";
	 	var after = aspect.after;
		function Evented(){
			// summary:
			//		A class that can be used as a mixin or base class,
			//		to add on() and emit() methods to a class
			//		for listening for events and emitting events:
			// example:
			//		|	define(["dojo/Evented", "dojo/_base/declare", "dojo/Stateful"
			//		|	], function(Evented, declare, Stateful){
			//		|		var EventedStateful = declare([Evented, Stateful], {...});
			//		|		var instance = new EventedStateful();
			//		|		instance.on("open", function(event){
			//		|		... do something with event
			//		|	 });
			//		|
			//		|	instance.emit("open", {name:"some event", ...});
		}
		Evented.prototype = {
			on: function(type, listener){
				return on.parse(this, type, listener, function(target, type){
					return after(target, 'on' + type, listener, true);
				});
			},
			emit: function(type, event){
				var args = [this];
				args.push.apply(args, arguments);
				return on.emit.apply(on, args);
			}
		};
		return Evented;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(12),__webpack_require__(13), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, win, dom, style){
		// module:
		//		dojo/dom-geometry
	
		// the result object
		var geom = {
			// summary:
			//		This module defines the core dojo DOM geometry API.
		};
	
		// Box functions will assume this model.
		// On IE/Opera, BORDER_BOX will be set if the primary document is in quirks mode.
		// Can be set to change behavior of box setters.
	
		// can be either:
		//	"border-box"
		//	"content-box" (default)
		geom.boxModel = "content-box";
	
		// We punt per-node box mode testing completely.
		// If anybody cares, we can provide an additional (optional) unit
		// that overrides existing code to include per-node box sensitivity.
	
		// Opera documentation claims that Opera 9 uses border-box in BackCompat mode.
		// but experiments (Opera 9.10.8679 on Windows Vista) indicate that it actually continues to use content-box.
		// IIRC, earlier versions of Opera did in fact use border-box.
		// Opera guys, this is really confusing. Opera being broken in quirks mode is not our fault.
	
		if(has("ie") /*|| has("opera")*/){
			// client code may have to adjust if compatMode varies across iframes
			geom.boxModel = document.compatMode == "BackCompat" ? "border-box" : "content-box";
		}
	
		geom.getPadExtents = function getPadExtents(/*DomNode*/ node, /*Object*/ computedStyle){
			// summary:
			//		Returns object with special values specifically useful for node
			//		fitting.
			// description:
			//		Returns an object with `w`, `h`, `l`, `t` properties:
			//	|		l/t/r/b = left/top/right/bottom padding (respectively)
			//	|		w = the total of the left and right padding
			//	|		h = the total of the top and bottom padding
			//		If 'node' has position, l/t forms the origin for child nodes.
			//		The w/h are used for calculating boxes.
			//		Normally application code will not need to invoke this
			//		directly, and will use the ...box... functions instead.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node), px = style.toPixelValue,
				l = px(node, s.paddingLeft), t = px(node, s.paddingTop), r = px(node, s.paddingRight), b = px(node, s.paddingBottom);
			return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
		};
	
		var none = "none";
	
		geom.getBorderExtents = function getBorderExtents(/*DomNode*/ node, /*Object*/ computedStyle){
			// summary:
			//		returns an object with properties useful for noting the border
			//		dimensions.
			// description:
			//		- l/t/r/b = the sum of left/top/right/bottom border (respectively)
			//		- w = the sum of the left and right border
			//		- h = the sum of the top and bottom border
			//
			//		The w/h are used for calculating boxes.
			//		Normally application code will not need to invoke this
			//		directly, and will use the ...box... functions instead.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var px = style.toPixelValue, s = computedStyle || style.getComputedStyle(node),
				l = s.borderLeftStyle != none ? px(node, s.borderLeftWidth) : 0,
				t = s.borderTopStyle != none ? px(node, s.borderTopWidth) : 0,
				r = s.borderRightStyle != none ? px(node, s.borderRightWidth) : 0,
				b = s.borderBottomStyle != none ? px(node, s.borderBottomWidth) : 0;
			return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
		};
	
		geom.getPadBorderExtents = function getPadBorderExtents(/*DomNode*/ node, /*Object*/ computedStyle){
			// summary:
			//		Returns object with properties useful for box fitting with
			//		regards to padding.
			// description:
			//		- l/t/r/b = the sum of left/top/right/bottom padding and left/top/right/bottom border (respectively)
			//		- w = the sum of the left and right padding and border
			//		- h = the sum of the top and bottom padding and border
			//
			//		The w/h are used for calculating boxes.
			//		Normally application code will not need to invoke this
			//		directly, and will use the ...box... functions instead.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node),
				p = geom.getPadExtents(node, s),
				b = geom.getBorderExtents(node, s);
			return {
				l: p.l + b.l,
				t: p.t + b.t,
				r: p.r + b.r,
				b: p.b + b.b,
				w: p.w + b.w,
				h: p.h + b.h
			};
		};
	
		geom.getMarginExtents = function getMarginExtents(node, computedStyle){
			// summary:
			//		returns object with properties useful for box fitting with
			//		regards to box margins (i.e., the outer-box).
			//
			//		- l/t = marginLeft, marginTop, respectively
			//		- w = total width, margin inclusive
			//		- h = total height, margin inclusive
			//
			//		The w/h are used for calculating boxes.
			//		Normally application code will not need to invoke this
			//		directly, and will use the ...box... functions instead.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node), px = style.toPixelValue,
				l = px(node, s.marginLeft), t = px(node, s.marginTop), r = px(node, s.marginRight), b = px(node, s.marginBottom);
			return {l: l, t: t, r: r, b: b, w: l + r, h: t + b};
		};
	
		// Box getters work in any box context because offsetWidth/clientWidth
		// are invariant wrt box context
		//
		// They do *not* work for display: inline objects that have padding styles
		// because the user agent ignores padding (it's bogus styling in any case)
		//
		// Be careful with IMGs because they are inline or block depending on
		// browser and browser mode.
	
		// Although it would be easier to read, there are not separate versions of
		// _getMarginBox for each browser because:
		// 1. the branching is not expensive
		// 2. factoring the shared code wastes cycles (function call overhead)
		// 3. duplicating the shared code wastes bytes
	
		geom.getMarginBox = function getMarginBox(/*DomNode*/ node, /*Object*/ computedStyle){
			// summary:
			//		returns an object that encodes the width, height, left and top
			//		positions of the node's margin box.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node), me = geom.getMarginExtents(node, s),
				l = node.offsetLeft - me.l, t = node.offsetTop - me.t, p = node.parentNode, px = style.toPixelValue, pcs;
			if(has("mozilla")){
				// Mozilla:
				// If offsetParent has a computed overflow != visible, the offsetLeft is decreased
				// by the parent's border.
				// We don't want to compute the parent's style, so instead we examine node's
				// computed left/top which is more stable.
				var sl = parseFloat(s.left), st = parseFloat(s.top);
				if(!isNaN(sl) && !isNaN(st)){
					l = sl;
					t = st;
				}else{
					// If child's computed left/top are not parseable as a number (e.g. "auto"), we
					// have no choice but to examine the parent's computed style.
					if(p && p.style){
						pcs = style.getComputedStyle(p);
						if(pcs.overflow != "visible"){
							l += pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
							t += pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
						}
					}
				}
			}else if(has("opera") || (has("ie") == 8 && !has("quirks"))){
				// On Opera and IE 8, offsetLeft/Top includes the parent's border
				if(p){
					pcs = style.getComputedStyle(p);
					l -= pcs.borderLeftStyle != none ? px(node, pcs.borderLeftWidth) : 0;
					t -= pcs.borderTopStyle != none ? px(node, pcs.borderTopWidth) : 0;
				}
			}
			return {l: l, t: t, w: node.offsetWidth + me.w, h: node.offsetHeight + me.h};
		};
	
		geom.getContentBox = function getContentBox(node, computedStyle){
			// summary:
			//		Returns an object that encodes the width, height, left and top
			//		positions of the node's content box, irrespective of the
			//		current box model.
			// node: DOMNode
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			// clientWidth/Height are important since the automatically account for scrollbars
			// fallback to offsetWidth/Height for special cases (see #3378)
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node), w = node.clientWidth, h,
				pe = geom.getPadExtents(node, s), be = geom.getBorderExtents(node, s);
			if(!w){
				w = node.offsetWidth;
				h = node.offsetHeight;
			}else{
				h = node.clientHeight;
				be.w = be.h = 0;
			}
			// On Opera, offsetLeft includes the parent's border
			if(has("opera")){
				pe.l += be.l;
				pe.t += be.t;
			}
			return {l: pe.l, t: pe.t, w: w - pe.w - be.w, h: h - pe.h - be.h};
		};
	
		// Box setters depend on box context because interpretation of width/height styles
		// vary wrt box context.
		//
		// The value of boxModel is used to determine box context.
		// boxModel can be set directly to change behavior.
		//
		// Beware of display: inline objects that have padding styles
		// because the user agent ignores padding (it's a bogus setup anyway)
		//
		// Be careful with IMGs because they are inline or block depending on
		// browser and browser mode.
		//
		// Elements other than DIV may have special quirks, like built-in
		// margins or padding, or values not detectable via computedStyle.
		// In particular, margins on TABLE do not seems to appear
		// at all in computedStyle on Mozilla.
	
		function setBox(/*DomNode*/ node, /*Number?*/ l, /*Number?*/ t, /*Number?*/ w, /*Number?*/ h, /*String?*/ u){
			// summary:
			//		sets width/height/left/top in the current (native) box-model
			//		dimensions. Uses the unit passed in u.
			// node:
			//		DOM Node reference. Id string not supported for performance
			//		reasons.
			// l:
			//		left offset from parent.
			// t:
			//		top offset from parent.
			// w:
			//		width in current box model.
			// h:
			//		width in current box model.
			// u:
			//		unit measure to use for other measures. Defaults to "px".
			u = u || "px";
			var s = node.style;
			if(!isNaN(l)){
				s.left = l + u;
			}
			if(!isNaN(t)){
				s.top = t + u;
			}
			if(w >= 0){
				s.width = w + u;
			}
			if(h >= 0){
				s.height = h + u;
			}
		}
	
		function isButtonTag(/*DomNode*/ node){
			// summary:
			//		True if the node is BUTTON or INPUT.type="button".
			return node.tagName.toLowerCase() == "button" ||
				node.tagName.toLowerCase() == "input" && (node.getAttribute("type") || "").toLowerCase() == "button"; // boolean
		}
	
		function usesBorderBox(/*DomNode*/ node){
			// summary:
			//		True if the node uses border-box layout.
	
			// We could test the computed style of node to see if a particular box
			// has been specified, but there are details and we choose not to bother.
	
			// TABLE and BUTTON (and INPUT type=button) are always border-box by default.
			// If you have assigned a different box to either one via CSS then
			// box functions will break.
	
			return geom.boxModel == "border-box" || node.tagName.toLowerCase() == "table" || isButtonTag(node); // boolean
		}
	
		geom.setContentSize = function setContentSize(/*DomNode*/ node, /*Object*/ box, /*Object*/ computedStyle){
			// summary:
			//		Sets the size of the node's contents, irrespective of margins,
			//		padding, or borders.
			// node: DOMNode
			// box: Object
			//		hash with optional "w", and "h" properties for "width", and "height"
			//		respectively. All specified properties should have numeric values in whole pixels.
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var w = box.w, h = box.h;
			if(usesBorderBox(node)){
				var pb = geom.getPadBorderExtents(node, computedStyle);
				if(w >= 0){
					w += pb.w;
				}
				if(h >= 0){
					h += pb.h;
				}
			}
			setBox(node, NaN, NaN, w, h);
		};
	
		var nilExtents = {l: 0, t: 0, w: 0, h: 0};
	
		geom.setMarginBox = function setMarginBox(/*DomNode*/ node, /*Object*/ box, /*Object*/ computedStyle){
			// summary:
			//		sets the size of the node's margin box and placement
			//		(left/top), irrespective of box model. Think of it as a
			//		passthrough to setBox that handles box-model vagaries for
			//		you.
			// node: DOMNode
			// box: Object
			//		hash with optional "l", "t", "w", and "h" properties for "left", "right", "width", and "height"
			//		respectively. All specified properties should have numeric values in whole pixels.
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var s = computedStyle || style.getComputedStyle(node), w = box.w, h = box.h,
			// Some elements have special padding, margin, and box-model settings.
			// To use box functions you may need to set padding, margin explicitly.
			// Controlling box-model is harder, in a pinch you might set dojo/dom-geometry.boxModel.
				pb = usesBorderBox(node) ? nilExtents : geom.getPadBorderExtents(node, s),
				mb = geom.getMarginExtents(node, s);
			if(has("webkit")){
				// on Safari (3.1.2), button nodes with no explicit size have a default margin
				// setting an explicit size eliminates the margin.
				// We have to swizzle the width to get correct margin reading.
				if(isButtonTag(node)){
					var ns = node.style;
					if(w >= 0 && !ns.width){
						ns.width = "4px";
					}
					if(h >= 0 && !ns.height){
						ns.height = "4px";
					}
				}
			}
			if(w >= 0){
				w = Math.max(w - pb.w - mb.w, 0);
			}
			if(h >= 0){
				h = Math.max(h - pb.h - mb.h, 0);
			}
			setBox(node, box.l, box.t, w, h);
		};
	
		// =============================
		// Positioning
		// =============================
	
		geom.isBodyLtr = function isBodyLtr(/*Document?*/ doc){
			// summary:
			//		Returns true if the current language is left-to-right, and false otherwise.
			// doc: Document?
			//		Optional document to query.   If unspecified, use win.doc.
			// returns: Boolean
	
			doc = doc || win.doc;
			return (win.body(doc).dir || doc.documentElement.dir || "ltr").toLowerCase() == "ltr"; // Boolean
		};
	
		geom.docScroll = function docScroll(/*Document?*/ doc){
			// summary:
			//		Returns an object with {node, x, y} with corresponding offsets.
			// doc: Document?
			//		Optional document to query.   If unspecified, use win.doc.
			// returns: Object
	
			doc = doc || win.doc;
			var node = win.doc.parentWindow || win.doc.defaultView;   // use UI window, not dojo.global window.   TODO: use dojo/window::get() except for circular dependency problem
			return "pageXOffset" in node ? {x: node.pageXOffset, y: node.pageYOffset } :
				(node = has("quirks") ? win.body(doc) : doc.documentElement) &&
					{x: geom.fixIeBiDiScrollLeft(node.scrollLeft || 0, doc), y: node.scrollTop || 0 };
		};
	
		geom.getIeDocumentElementOffset = function(/*Document?*/ doc){
			// summary:
			//		Deprecated method previously used for IE6-IE7.  Now, just returns `{x:0, y:0}`.
			return {
				x: 0,
				y: 0
			};
		};
	
		geom.fixIeBiDiScrollLeft = function fixIeBiDiScrollLeft(/*Integer*/ scrollLeft, /*Document?*/ doc){
			// summary:
			//		In RTL direction, scrollLeft should be a negative value, but IE
			//		returns a positive one. All codes using documentElement.scrollLeft
			//		must call this function to fix this error, otherwise the position
			//		will offset to right when there is a horizontal scrollbar.
			// scrollLeft: Number
			// doc: Document?
			//		Optional document to query.   If unspecified, use win.doc.
			// returns: Number
	
			// In RTL direction, scrollLeft should be a negative value, but IE
			// returns a positive one. All codes using documentElement.scrollLeft
			// must call this function to fix this error, otherwise the position
			// will offset to right when there is a horizontal scrollbar.
	
			doc = doc || win.doc;
			var ie = has("ie");
			if(ie && !geom.isBodyLtr(doc)){
				var qk = has("quirks"),
					de = qk ? win.body(doc) : doc.documentElement,
					pwin = win.global;	// TODO: use winUtils.get(doc) after resolving circular dependency b/w dom-geometry.js and dojo/window.js
				if(ie == 6 && !qk && pwin.frameElement && de.scrollHeight > de.clientHeight){
					scrollLeft += de.clientLeft; // workaround ie6+strict+rtl+iframe+vertical-scrollbar bug where clientWidth is too small by clientLeft pixels
				}
				return (ie < 8 || qk) ? (scrollLeft + de.clientWidth - de.scrollWidth) : -scrollLeft; // Integer
			}
			return scrollLeft; // Integer
		};
	
		geom.position = function(/*DomNode*/ node, /*Boolean?*/ includeScroll){
			// summary:
			//		Gets the position and size of the passed element relative to
			//		the viewport (if includeScroll==false), or relative to the
			//		document root (if includeScroll==true).
			//
			// description:
			//		Returns an object of the form:
			//		`{ x: 100, y: 300, w: 20, h: 15 }`.
			//		If includeScroll==true, the x and y values will include any
			//		document offsets that may affect the position relative to the
			//		viewport.
			//		Uses the border-box model (inclusive of border and padding but
			//		not margin).  Does not act as a setter.
			// node: DOMNode|String
			// includeScroll: Boolean?
			// returns: Object
	
			node = dom.byId(node);
			var	db = win.body(node.ownerDocument),
				ret = node.getBoundingClientRect();
			ret = {x: ret.left, y: ret.top, w: ret.right - ret.left, h: ret.bottom - ret.top};
	
			if(has("ie") < 9){
				// fixes the position in IE, quirks mode
				ret.x -= (has("quirks") ? db.clientLeft + db.offsetLeft : 0);
				ret.y -= (has("quirks") ? db.clientTop + db.offsetTop : 0);
			}
	
			// account for document scrolling
			// if offsetParent is used, ret value already includes scroll position
			// so we may have to actually remove that value if !includeScroll
			if(includeScroll){
				var scroll = geom.docScroll(node.ownerDocument);
				ret.x += scroll.x;
				ret.y += scroll.y;
			}
	
			return ret; // Object
		};
	
		// random "private" functions wildly used throughout the toolkit
	
		geom.getMarginSize = function getMarginSize(/*DomNode*/ node, /*Object*/ computedStyle){
			// summary:
			//		returns an object that encodes the width and height of
			//		the node's margin box
			// node: DOMNode|String
			// computedStyle: Object?
			//		This parameter accepts computed styles object.
			//		If this parameter is omitted, the functions will call
			//		dojo/dom-style.getComputedStyle to get one. It is a better way, calling
			//		dojo/dom-style.getComputedStyle once, and then pass the reference to this
			//		computedStyle parameter. Wherever possible, reuse the returned
			//		object of dojo/dom-style.getComputedStyle().
	
			node = dom.byId(node);
			var me = geom.getMarginExtents(node, computedStyle || style.getComputedStyle(node));
			var size = node.getBoundingClientRect();
			return {
				w: (size.right - size.left) + me.w,
				h: (size.bottom - size.top) + me.h
			};
		};
	
		geom.normalizeEvent = function(event){
			// summary:
			//		Normalizes the geometry of a DOM event, normalizing the pageX, pageY,
			//		offsetX, offsetY, layerX, and layerX properties
			// event: Object
			if(!("layerX" in event)){
				event.layerX = event.offsetX;
				event.layerY = event.offsetY;
			}
	
			if(!("pageX" in event)){
				// FIXME: scroll position query is duped from dojo/_base/html to
				// avoid dependency on that entire module. Now that HTML is in
				// Base, we should convert back to something similar there.
				var se = event.target;
				var doc = (se && se.ownerDocument) || document;
				// DO NOT replace the following to use dojo/_base/window.body(), in IE, document.documentElement should be used
				// here rather than document.body
				var docBody = has("quirks") ? doc.body : doc.documentElement;
				event.pageX = event.clientX + geom.fixIeBiDiScrollLeft(docBody.scrollLeft || 0, doc);
				event.pageY = event.clientY + (docBody.scrollTop || 0);
			}
		};
	
		// TODO: evaluate separate getters/setters for position and sizes?
	
		return geom;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has, lang){
		// module:
		//		dojo/_base/array
	
		// our old simple function builder stuff
		var cache = {}, u;
	
		function buildFn(fn){
			return cache[fn] = new Function("item", "index", "array", fn); // Function
		}
		// magic snippet: if(typeof fn == "string") fn = cache[fn] || buildFn(fn);
	
		// every & some
	
		function everyOrSome(some){
			var every = !some;
			return function(a, fn, o){
				var i = 0, l = a && a.length || 0, result;
				if(l && typeof a == "string") a = a.split("");
				if(typeof fn == "string") fn = cache[fn] || buildFn(fn);
				if(o){
					for(; i < l; ++i){
						result = !fn.call(o, a[i], i, a);
						if(some ^ result){
							return !result;
						}
					}
				}else{
					for(; i < l; ++i){
						result = !fn(a[i], i, a);
						if(some ^ result){
							return !result;
						}
					}
				}
				return every; // Boolean
			};
		}
	
		// indexOf, lastIndexOf
	
		function index(up){
			var delta = 1, lOver = 0, uOver = 0;
			if(!up){
				delta = lOver = uOver = -1;
			}
			return function(a, x, from, last){
				if(last && delta > 0){
					// TODO: why do we use a non-standard signature? why do we need "last"?
					return array.lastIndexOf(a, x, from);
				}
				var l = a && a.length || 0, end = up ? l + uOver : lOver, i;
				if(from === u){
					i = up ? lOver : l + uOver;
				}else{
					if(from < 0){
						i = l + from;
						if(i < 0){
							i = lOver;
						}
					}else{
						i = from >= l ? l + uOver : from;
					}
				}
				if(l && typeof a == "string") a = a.split("");
				for(; i != end; i += delta){
					if(a[i] == x){
						return i; // Number
					}
				}
				return -1; // Number
			};
		}
	
		var array = {
			// summary:
			//		The Javascript v1.6 array extensions.
	
			every: everyOrSome(false),
			/*=====
			 every: function(arr, callback, thisObject){
				 // summary:
				 //		Determines whether or not every item in arr satisfies the
				 //		condition implemented by callback.
				 // arr: Array|String
				 //		the array to iterate on. If a string, operates on individual characters.
				 // callback: Function|String
				 //		a function is invoked with three arguments: item, index,
				 //		and array and returns true if the condition is met.
				 // thisObject: Object?
				 //		may be used to scope the call to callback
				 // returns: Boolean
				 // description:
				 //		This function corresponds to the JavaScript 1.6 Array.every() method, with one difference: when
				 //		run over sparse arrays, this implementation passes the "holes" in the sparse array to
				 //		the callback function with a value of undefined. JavaScript 1.6's every skips the holes in the sparse array.
				 //		For more details, see:
				 //		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/every
				 // example:
				 //	|	// returns false
				 //	|	array.every([1, 2, 3, 4], function(item){ return item>1; });
				 // example:
				 //	|	// returns true
				 //	|	array.every([1, 2, 3, 4], function(item){ return item>0; });
			 },
			 =====*/
	
			some: everyOrSome(true),
			/*=====
			some: function(arr, callback, thisObject){
				// summary:
				//		Determines whether or not any item in arr satisfies the
				//		condition implemented by callback.
				// arr: Array|String
				//		the array to iterate over. If a string, operates on individual characters.
				// callback: Function|String
				//		a function is invoked with three arguments: item, index,
				//		and array and returns true if the condition is met.
				// thisObject: Object?
				//		may be used to scope the call to callback
				// returns: Boolean
				// description:
				//		This function corresponds to the JavaScript 1.6 Array.some() method, with one difference: when
				//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
				//		the callback function with a value of undefined. JavaScript 1.6's some skips the holes in the sparse array.
				//		For more details, see:
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/some
				// example:
				//	| // is true
				//	| array.some([1, 2, 3, 4], function(item){ return item>1; });
				// example:
				//	| // is false
				//	| array.some([1, 2, 3, 4], function(item){ return item<1; });
			},
			=====*/
	
			indexOf: index(true),
			/*=====
			indexOf: function(arr, value, fromIndex, findLast){
				// summary:
				//		locates the first index of the provided value in the
				//		passed array. If the value is not found, -1 is returned.
				// description:
				//		This method corresponds to the JavaScript 1.6 Array.indexOf method, with two differences:
				//
				//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
				//		   whereas JavaScript 1.6's indexOf skips the holes in the sparse array.
				//		2. uses equality (==) rather than strict equality (===)
				//
				//		For details on this method, see:
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/indexOf
				// arr: Array
				// value: Object
				// fromIndex: Integer?
				// findLast: Boolean?
				//		Makes indexOf() work like lastIndexOf().  Used internally; not meant for external usage.
				// returns: Number
			},
			=====*/
	
			lastIndexOf: index(false),
			/*=====
			lastIndexOf: function(arr, value, fromIndex){
				// summary:
				//		locates the last index of the provided value in the passed
				//		array. If the value is not found, -1 is returned.
				// description:
			 	//		This method corresponds to the JavaScript 1.6 Array.lastIndexOf method, with two differences:
			 	//
			 	//		1. when run over sparse arrays, the Dojo function invokes the callback for every index
			 	//		   whereas JavaScript 1.6's lasIndexOf skips the holes in the sparse array.
			 	//		2. uses equality (==) rather than strict equality (===)
			 	//
			 	//		For details on this method, see:
			 	//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/lastIndexOf
				// arr: Array,
				// value: Object,
				// fromIndex: Integer?
				// returns: Number
			},
			=====*/
	
			forEach: function(arr, callback, thisObject){
				// summary:
				//		for every item in arr, callback is invoked. Return values are ignored.
				//		If you want to break out of the loop, consider using array.every() or array.some().
				//		forEach does not allow breaking out of the loop over the items in arr.
				// arr:
				//		the array to iterate over. If a string, operates on individual characters.
				// callback:
				//		a function is invoked with three arguments: item, index, and array
				// thisObject:
				//		may be used to scope the call to callback
				// description:
				//		This function corresponds to the JavaScript 1.6 Array.forEach() method, with one difference: when
				//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
				//		the callback function with a value of undefined. JavaScript 1.6's forEach skips the holes in the sparse array.
				//		For more details, see:
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach
				// example:
				//	| // log out all members of the array:
				//	| array.forEach(
				//	|		[ "thinger", "blah", "howdy", 10 ],
				//	|		function(item){
				//	|			console.log(item);
				//	|		}
				//	| );
				// example:
				//	| // log out the members and their indexes
				//	| array.forEach(
				//	|		[ "thinger", "blah", "howdy", 10 ],
				//	|		function(item, idx, arr){
				//	|			console.log(item, "at index:", idx);
				//	|		}
				//	| );
				// example:
				//	| // use a scoped object member as the callback
				//	|
				//	| var obj = {
				//	|		prefix: "logged via obj.callback:",
				//	|		callback: function(item){
				//	|			console.log(this.prefix, item);
				//	|		}
				//	| };
				//	|
				//	| // specifying the scope function executes the callback in that scope
				//	| array.forEach(
				//	|		[ "thinger", "blah", "howdy", 10 ],
				//	|		obj.callback,
				//	|		obj
				//	| );
				//	|
				//	| // alternately, we can accomplish the same thing with lang.hitch()
				//	| array.forEach(
				//	|		[ "thinger", "blah", "howdy", 10 ],
				//	|		lang.hitch(obj, "callback")
				//	| );
				// arr: Array|String
				// callback: Function|String
				// thisObject: Object?
	
				var i = 0, l = arr && arr.length || 0;
				if(l && typeof arr == "string") arr = arr.split("");
				if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
				if(thisObject){
					for(; i < l; ++i){
						callback.call(thisObject, arr[i], i, arr);
					}
				}else{
					for(; i < l; ++i){
						callback(arr[i], i, arr);
					}
				}
			},
	
			map: function(arr, callback, thisObject, Ctr){
				// summary:
				//		applies callback to each element of arr and returns
				//		an Array with the results
				// arr: Array|String
				//		the array to iterate on. If a string, operates on
				//		individual characters.
				// callback: Function|String
				//		a function is invoked with three arguments, (item, index,
				//		array),	 and returns a value
				// thisObject: Object?
				//		may be used to scope the call to callback
				// returns: Array
				// description:
				//		This function corresponds to the JavaScript 1.6 Array.map() method, with one difference: when
				//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
				//		the callback function with a value of undefined. JavaScript 1.6's map skips the holes in the sparse array.
				//		For more details, see:
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
				// example:
				//	| // returns [2, 3, 4, 5]
				//	| array.map([1, 2, 3, 4], function(item){ return item+1 });
	
				// TODO: why do we have a non-standard signature here? do we need "Ctr"?
				var i = 0, l = arr && arr.length || 0, out = new (Ctr || Array)(l);
				if(l && typeof arr == "string") arr = arr.split("");
				if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
				if(thisObject){
					for(; i < l; ++i){
						out[i] = callback.call(thisObject, arr[i], i, arr);
					}
				}else{
					for(; i < l; ++i){
						out[i] = callback(arr[i], i, arr);
					}
				}
				return out; // Array
			},
	
			filter: function(arr, callback, thisObject){
				// summary:
				//		Returns a new Array with those items from arr that match the
				//		condition implemented by callback.
				// arr: Array
				//		the array to iterate over.
				// callback: Function|String
				//		a function that is invoked with three arguments (item,
				//		index, array). The return of this function is expected to
				//		be a boolean which determines whether the passed-in item
				//		will be included in the returned array.
				// thisObject: Object?
				//		may be used to scope the call to callback
				// returns: Array
				// description:
				//		This function corresponds to the JavaScript 1.6 Array.filter() method, with one difference: when
				//		run over sparse arrays, this implementation passes the "holes" in the sparse array to
				//		the callback function with a value of undefined. JavaScript 1.6's filter skips the holes in the sparse array.
				//		For more details, see:
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
				// example:
				//	| // returns [2, 3, 4]
				//	| array.filter([1, 2, 3, 4], function(item){ return item>1; });
	
				// TODO: do we need "Ctr" here like in map()?
				var i = 0, l = arr && arr.length || 0, out = [], value;
				if(l && typeof arr == "string") arr = arr.split("");
				if(typeof callback == "string") callback = cache[callback] || buildFn(callback);
				if(thisObject){
					for(; i < l; ++i){
						value = arr[i];
						if(callback.call(thisObject, value, i, arr)){
							out.push(value);
						}
					}
				}else{
					for(; i < l; ++i){
						value = arr[i];
						if(callback(value, i, arr)){
							out.push(value);
						}
					}
				}
				return out; // Array
			},
	
			clearCache: function(){
				cache = {};
			}
		};
	
	
		has("extend-dojo") && lang.mixin(dojo, array);
	
		return array;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(6), __webpack_require__(71), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has, require, domReady, lang){
		// module:
		//		dojo/ready
		// note:
		//		This module should be unnecessary in dojo 2.0
	
		var
			// truthy if DOMContentLoaded or better (e.g., window.onload fired) has been achieved
			isDomReady = 0,
	
			// The queue of functions waiting to execute as soon as dojo.ready conditions satisfied
			loadQ = [],
	
			// prevent recursion in onLoad
			onLoadRecursiveGuard = 0,
	
			handleDomReady = function(){
				isDomReady = 1;
				dojo._postLoad = dojo.config.afterOnLoad = true;
				onEvent();
			},
	
			onEvent = function(){
				// Called when some state changes:
				//		- dom ready
				//		- dojo/domReady has finished processing everything in its queue
				//		- task added to loadQ
				//		- require() has finished loading all currently requested modules
				//
				// Run the functions queued with dojo.ready if appropriate.
	
	
				//guard against recursions into this function
				if(onLoadRecursiveGuard){
					return;
				}
				onLoadRecursiveGuard = 1;
	
				// Run tasks in queue if require() is finished loading modules, the dom is ready, and there are no
				// pending tasks registered via domReady().
				// The last step is necessary so that a user defined dojo.ready() callback is delayed until after the
				// domReady() calls inside of dojo.	  Failure can be seen on dijit/tests/robot/Dialog_ally.html on IE8
				// because the dijit/focus.js domReady() callback doesn't execute until after the test starts running.
				while(isDomReady && (!domReady || domReady._Q.length == 0) && (require.idle ? require.idle() : true) && loadQ.length){
					var f = loadQ.shift();
					try{
						f();
					}catch(e){
						// force the dojo.js on("error") handler do display the message
						e.info = e.message;
						if(require.signal){
							require.signal("error", e);
						}else{
							throw e;
						}
					}
				}
	
				onLoadRecursiveGuard = 0;
			};
	
		// Check if we should run the next queue operation whenever require() finishes loading modules or domReady
		// finishes processing it's queue.
		require.on && require.on("idle", onEvent);
		if(domReady){
			domReady._onQEmpty = onEvent;
		}
	
		var ready = dojo.ready = dojo.addOnLoad = function(priority, context, callback){
			// summary:
			//		Add a function to execute on DOM content loaded and all requested modules have arrived and been evaluated.
			//		In most cases, the `domReady` plug-in should suffice and this method should not be needed.
			//
			//		When called in a non-browser environment, just checks that all requested modules have arrived and been
			//		evaluated.
			// priority: Integer?
			//		The order in which to exec this callback relative to other callbacks, defaults to 1000
			// context: Object?|Function
			//		The context in which to run execute callback, or a callback if not using context
			// callback: Function?
			//		The function to execute.
			//
			// example:
			//	Simple DOM and Modules ready syntax
			//	|	require(["dojo/ready"], function(ready){
			//	|		ready(function(){ alert("Dom ready!"); });
			//	|	});
			//
			// example:
			//	Using a priority
			//	|	require(["dojo/ready"], function(ready){
			//	|		ready(2, function(){ alert("low priority ready!"); })
			//	|	});
			//
			// example:
			//	Using context
			//	|	require(["dojo/ready"], function(ready){
			//	|		ready(foo, function(){
			//	|			// in here, this == foo
			//	|		});
			//	|	});
			//
			// example:
			//	Using dojo/hitch style args:
			//	|	require(["dojo/ready"], function(ready){
			//	|		var foo = { dojoReady: function(){ console.warn(this, "dojo dom and modules ready."); } };
			//	|		ready(foo, "dojoReady");
			//	|	});
	
			var hitchArgs = lang._toArray(arguments);
			if(typeof priority != "number"){
				callback = context;
				context = priority;
				priority = 1000;
			}else{
				hitchArgs.shift();
			}
			callback = callback ?
				lang.hitch.apply(dojo, hitchArgs) :
				function(){
					context();
				};
			callback.priority = priority;
			for(var i = 0; i < loadQ.length && priority >= loadQ[i].priority; i++){}
			loadQ.splice(i, 0, callback);
			onEvent();
		};
	
		has.add("dojo-config-addOnLoad", 1);
		if(has("dojo-config-addOnLoad")){
			var dca = dojo.config.addOnLoad;
			if(dca){
				ready[(lang.isArray(dca) ? "apply" : "call")](dojo, dca);
			}
		}
	
		if(has("dojo-sync-loader") && dojo.config.parseOnLoad && !dojo.isAsync){
			ready(99, function(){
				if(!dojo.parser){
					dojo.deprecated("Add explicit require(['dojo/parser']);", "", "2.0");
					require(["dojo/parser"]);
				}
			});
		}
	
		if(domReady){
			domReady(handleDomReady);
		}else{
			handleDomReady();
		}
	
		return ready;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has){
		var global = (function () { return this; })(),
			doc = document,
			readyStates = { 'loaded': 1, 'complete': 1 },
			fixReadyState = typeof doc.readyState != "string",
			ready = !!readyStates[doc.readyState],
			readyQ = [],
			recursiveGuard;
	
		function domReady(callback){
			// summary:
			//		Plugin to delay require()/define() callback from firing until the DOM has finished loading.
			readyQ.push(callback);
			if(ready){ processQ(); }
		}
		domReady.load = function(id, req, load){
			domReady(load);
		};
	
		// Export queue so that ready() can check if it's empty or not.
		domReady._Q = readyQ;
		domReady._onQEmpty = function(){
			// summary:
			//		Private method overridden by dojo/ready, to notify when everything in the
			//		domReady queue has been processed.  Do not use directly.
			//		Will be removed in 2.0, along with domReady._Q.
		};
	
		// For FF <= 3.5
		if(fixReadyState){ doc.readyState = "loading"; }
	
		function processQ(){
			// Calls all functions in the queue in order, unless processQ() is already running, in which case just return
	
			if(recursiveGuard){ return; }
			recursiveGuard = true;
	
			while(readyQ.length){
				try{
					(readyQ.shift())(doc);
				}catch(err){
					console.error(err, "in domReady callback", err.stack);
				}
			}
	
			recursiveGuard = false;
	
			// Notification for dojo/ready.  Remove for 2.0.
			// Note that this could add more tasks to the ready queue.
			domReady._onQEmpty();
		}
	
		if(!ready){
			var tests = [],
				detectReady = function(evt){
					evt = evt || global.event;
					if(ready || (evt.type == "readystatechange" && !readyStates[doc.readyState])){ return; }
	
					// For FF <= 3.5
					if(fixReadyState){ doc.readyState = "complete"; }
	
					ready = 1;
					processQ();
				},
				on = function(node, event){
					node.addEventListener(event, detectReady, false);
					readyQ.push(function(){ node.removeEventListener(event, detectReady, false); });
				};
	
			if(!has("dom-addeventlistener")){
				on = function(node, event){
					event = "on" + event;
					node.attachEvent(event, detectReady);
					readyQ.push(function(){ node.detachEvent(event, detectReady); });
				};
	
				var div = doc.createElement("div");
				try{
					if(div.doScroll && global.frameElement === null){
						// the doScroll test is only useful if we're in the top-most frame
						tests.push(function(){
							// Derived with permission from Diego Perini's IEContentLoaded
							// http://javascript.nwbox.com/IEContentLoaded/
							try{
								div.doScroll("left");
								return 1;
							}catch(e){}
						});
					}
				}catch(e){}
			}
	
			on(doc, "DOMContentLoaded");
			on(global, "load");
	
			if("onreadystatechange" in doc){
				on(doc, "readystatechange");
			}else if(!fixReadyState){
				// if the ready state property exists and there's
				// no readystatechange event, poll for the state
				// to change
				tests.push(function(){
					return readyStates[doc.readyState];
				});
			}
	
			if(tests.length){
				var poller = function(){
					if(ready){ return; }
					var i = tests.length;
					while(i--){
						if(tests[i]()){
							detectReady("poller");
							return;
						}
					}
					setTimeout(poller, 30);
				};
				poller();
			}
		}
	
		return domReady;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(7),  __webpack_require__(8), __webpack_require__(21), __webpack_require__(143), __webpack_require__(19), __webpack_require__(9), __webpack_require__(13), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, config, /*===== declare, =====*/ lang, Evented, Color, aspect, has, dom, style){
		// module:
		//		dojo/_base/fx
		// notes:
		//		Animation loosely package based on Dan Pupius' work, contributed under CLA; see
		//		http://pupius.co.uk/js/Toolkit.Drawing.js
	
		var _mixin = lang.mixin;
	
		// Module export
		var basefx = {
			// summary:
			//		This module defines the base dojo/_base/fx implementation.
		};
	
		var _Line = basefx._Line = function(/*int*/ start, /*int*/ end){
			// summary:
			//		Object used to generate values from a start value to an end value
			// start: int
			//		Beginning value for range
			// end: int
			//		Ending value for range
			this.start = start;
			this.end = end;
		};
	
		_Line.prototype.getValue = function(/*float*/ n){
			// summary:
			//		Returns the point on the line
			// n:
			//		a floating point number greater than 0 and less than 1
			return ((this.end - this.start) * n) + this.start; // Decimal
		};
	
		var Animation = basefx.Animation = function(args){
			// summary:
			//		A generic animation class that fires callbacks into its handlers
			//		object at various states.
			// description:
			//		A generic animation class that fires callbacks into its handlers
			//		object at various states. Nearly all dojo animation functions
			//		return an instance of this method, usually without calling the
			//		.play() method beforehand. Therefore, you will likely need to
			//		call .play() on instances of `Animation` when one is
			//		returned.
			// args: Object
			//		The 'magic argument', mixing all the properties into this
			//		animation instance.
	
			_mixin(this, args);
			if(lang.isArray(this.curve)){
				this.curve = new _Line(this.curve[0], this.curve[1]);
			}
	
		};
		Animation.prototype = new Evented();
	
		lang.extend(Animation, {
			// duration: Integer
			//		The time in milliseconds the animation will take to run
			duration: 350,
	
		/*=====
			// curve: _Line|Array
			//		A two element array of start and end values, or a `_Line` instance to be
			//		used in the Animation.
			curve: null,
	
			// easing: Function?
			//		A Function to adjust the acceleration (or deceleration) of the progress
			//		across a _Line
			easing: null,
		=====*/
	
			// repeat: Integer?
			//		The number of times to loop the animation
			repeat: 0,
	
			// rate: Integer?
			//		the time in milliseconds to wait before advancing to next frame
			//		(used as a fps timer: 1000/rate = fps)
			rate: 20 /* 50 fps */,
	
		/*=====
			// delay: Integer?
			//		The time in milliseconds to wait before starting animation after it
			//		has been .play()'ed
			delay: null,
	
			// beforeBegin: Event?
			//		Synthetic event fired before a Animation begins playing (synchronous)
			beforeBegin: null,
	
			// onBegin: Event?
			//		Synthetic event fired as a Animation begins playing (useful?)
			onBegin: null,
	
			// onAnimate: Event?
			//		Synthetic event fired at each interval of the Animation
			onAnimate: null,
	
			// onEnd: Event?
			//		Synthetic event fired after the final frame of the Animation
			onEnd: null,
	
			// onPlay: Event?
			//		Synthetic event fired any time the Animation is play()'ed
			onPlay: null,
	
			// onPause: Event?
			//		Synthetic event fired when the Animation is paused
			onPause: null,
	
			// onStop: Event
			//		Synthetic event fires when the Animation is stopped
			onStop: null,
	
		=====*/
	
			_percent: 0,
			_startRepeatCount: 0,
	
			_getStep: function(){
				var _p = this._percent,
					_e = this.easing
				;
				return _e ? _e(_p) : _p;
			},
			_fire: function(/*Event*/ evt, /*Array?*/ args){
				// summary:
				//		Convenience function.  Fire event "evt" and pass it the
				//		arguments specified in "args".
				// description:
				//		Convenience function.  Fire event "evt" and pass it the
				//		arguments specified in "args".
				//		Fires the callback in the scope of this Animation
				//		instance.
				// evt:
				//		The event to fire.
				// args:
				//		The arguments to pass to the event.
				var a = args||[];
				if(this[evt]){
					if(config.debugAtAllCosts){
						this[evt].apply(this, a);
					}else{
						try{
							this[evt].apply(this, a);
						}catch(e){
							// squelch and log because we shouldn't allow exceptions in
							// synthetic event handlers to cause the internal timer to run
							// amuck, potentially pegging the CPU. I'm not a fan of this
							// squelch, but hopefully logging will make it clear what's
							// going on
							console.error("exception in animation handler for:", evt);
							console.error(e);
						}
					}
				}
				return this; // Animation
			},
	
			play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
				// summary:
				//		Start the animation.
				// delay:
				//		How many milliseconds to delay before starting.
				// gotoStart:
				//		If true, starts the animation from the beginning; otherwise,
				//		starts it from its current position.
				// returns: Animation
				//		The instance to allow chaining.
	
				var _t = this;
				if(_t._delayTimer){ _t._clearTimer(); }
				if(gotoStart){
					_t._stopTimer();
					_t._active = _t._paused = false;
					_t._percent = 0;
				}else if(_t._active && !_t._paused){
					return _t;
				}
	
				_t._fire("beforeBegin", [_t.node]);
	
				var de = delay || _t.delay,
					_p = lang.hitch(_t, "_play", gotoStart);
	
				if(de > 0){
					_t._delayTimer = setTimeout(_p, de);
					return _t;
				}
				_p();
				return _t;	// Animation
			},
	
			_play: function(gotoStart){
				var _t = this;
				if(_t._delayTimer){ _t._clearTimer(); }
				_t._startTime = new Date().valueOf();
				if(_t._paused){
					_t._startTime -= _t.duration * _t._percent;
				}
	
				_t._active = true;
				_t._paused = false;
				var value = _t.curve.getValue(_t._getStep());
				if(!_t._percent){
					if(!_t._startRepeatCount){
						_t._startRepeatCount = _t.repeat;
					}
					_t._fire("onBegin", [value]);
				}
	
				_t._fire("onPlay", [value]);
	
				_t._cycle();
				return _t; // Animation
			},
	
			pause: function(){
				// summary:
				//		Pauses a running animation.
				var _t = this;
				if(_t._delayTimer){ _t._clearTimer(); }
				_t._stopTimer();
				if(!_t._active){ return _t; /*Animation*/ }
				_t._paused = true;
				_t._fire("onPause", [_t.curve.getValue(_t._getStep())]);
				return _t; // Animation
			},
	
			gotoPercent: function(/*Decimal*/ percent, /*Boolean?*/ andPlay){
				// summary:
				//		Sets the progress of the animation.
				// percent:
				//		A percentage in decimal notation (between and including 0.0 and 1.0).
				// andPlay:
				//		If true, play the animation after setting the progress.
				var _t = this;
				_t._stopTimer();
				_t._active = _t._paused = true;
				_t._percent = percent;
				if(andPlay){ _t.play(); }
				return _t; // Animation
			},
	
			stop: function(/*boolean?*/ gotoEnd){
				// summary:
				//		Stops a running animation.
				// gotoEnd:
				//		If true, the animation will end.
				var _t = this;
				if(_t._delayTimer){ _t._clearTimer(); }
				if(!_t._timer){ return _t; /* Animation */ }
				_t._stopTimer();
				if(gotoEnd){
					_t._percent = 1;
				}
				_t._fire("onStop", [_t.curve.getValue(_t._getStep())]);
				_t._active = _t._paused = false;
				return _t; // Animation
			},
	
			destroy: function(){
				// summary:
				//		cleanup the animation
				this.stop();
			},
	
			status: function(){
				// summary:
				//		Returns a string token representation of the status of
				//		the animation, one of: "paused", "playing", "stopped"
				if(this._active){
					return this._paused ? "paused" : "playing"; // String
				}
				return "stopped"; // String
			},
	
			_cycle: function(){
				var _t = this;
				if(_t._active){
					var curr = new Date().valueOf();
					// Allow durations of 0 (instant) by setting step to 1 - see #13798
					var step = _t.duration === 0 ? 1 : (curr - _t._startTime) / (_t.duration);
	
					if(step >= 1){
						step = 1;
					}
					_t._percent = step;
	
					// Perform easing
					if(_t.easing){
						step = _t.easing(step);
					}
	
					_t._fire("onAnimate", [_t.curve.getValue(step)]);
	
					if(_t._percent < 1){
						_t._startTimer();
					}else{
						_t._active = false;
	
						if(_t.repeat > 0){
							_t.repeat--;
							_t.play(null, true);
						}else if(_t.repeat == -1){
							_t.play(null, true);
						}else{
							if(_t._startRepeatCount){
								_t.repeat = _t._startRepeatCount;
								_t._startRepeatCount = 0;
							}
						}
						_t._percent = 0;
						_t._fire("onEnd", [_t.node]);
						!_t.repeat && _t._stopTimer();
					}
				}
				return _t; // Animation
			},
	
			_clearTimer: function(){
				// summary:
				//		Clear the play delay timer
				clearTimeout(this._delayTimer);
				delete this._delayTimer;
			}
	
		});
	
		// the local timer, stubbed into all Animation instances
		var ctr = 0,
			timer = null,
			runner = {
				run: function(){}
			};
	
		lang.extend(Animation, {
	
			_startTimer: function(){
				if(!this._timer){
					this._timer = aspect.after(runner, "run", lang.hitch(this, "_cycle"), true);
					ctr++;
				}
				if(!timer){
					timer = setInterval(lang.hitch(runner, "run"), this.rate);
				}
			},
	
			_stopTimer: function(){
				if(this._timer){
					this._timer.remove();
					this._timer = null;
					ctr--;
				}
				if(ctr <= 0){
					clearInterval(timer);
					timer = null;
					ctr = 0;
				}
			}
	
		});
	
		var _makeFadeable =
			has("ie") ? function(node){
				// only set the zoom if the "tickle" value would be the same as the
				// default
				var ns = node.style;
				// don't set the width to auto if it didn't already cascade that way.
				// We don't want to f anyones designs
				if(!ns.width.length && style.get(node, "width") == "auto"){
					ns.width = "auto";
				}
			} :
			function(){};
	
		basefx._fade = function(/*Object*/ args){
			// summary:
			//		Returns an animation that will fade the node defined by
			//		args.node from the start to end values passed (args.start
			//		args.end) (end is mandatory, start is optional)
	
			args.node = dom.byId(args.node);
			var fArgs = _mixin({ properties: {} }, args),
				props = (fArgs.properties.opacity = {});
	
			props.start = !("start" in fArgs) ?
				function(){
					return +style.get(fArgs.node, "opacity")||0;
				} : fArgs.start;
			props.end = fArgs.end;
	
			var anim = basefx.animateProperty(fArgs);
			aspect.after(anim, "beforeBegin", lang.partial(_makeFadeable, fArgs.node), true);
	
			return anim; // Animation
		};
	
		/*=====
		var __FadeArgs = declare(null, {
			// node: DOMNode|String
			//		The node referenced in the animation
			// duration: Integer?
			//		Duration of the animation in milliseconds.
			// easing: Function?
			//		An easing function.
		});
		=====*/
	
		basefx.fadeIn = function(/*__FadeArgs*/ args){
			// summary:
			//		Returns an animation that will fade node defined in 'args' from
			//		its current opacity to fully opaque.
			return basefx._fade(_mixin({ end: 1 }, args)); // Animation
		};
	
		basefx.fadeOut = function(/*__FadeArgs*/ args){
			// summary:
			//		Returns an animation that will fade node defined in 'args'
			//		from its current opacity to fully transparent.
			return basefx._fade(_mixin({ end: 0 }, args)); // Animation
		};
	
		basefx._defaultEasing = function(/*Decimal?*/ n){
			// summary:
			//		The default easing function for Animation(s)
			return 0.5 + ((Math.sin((n + 1.5) * Math.PI)) / 2);	// Decimal
		};
	
		var PropLine = function(properties){
			// PropLine is an internal class which is used to model the values of
			// an a group of CSS properties across an animation lifecycle. In
			// particular, the "getValue" function handles getting interpolated
			// values between start and end for a particular CSS value.
			this._properties = properties;
			for(var p in properties){
				var prop = properties[p];
				if(prop.start instanceof Color){
					// create a reusable temp color object to keep intermediate results
					prop.tempColor = new Color();
				}
			}
		};
	
		PropLine.prototype.getValue = function(r){
			var ret = {};
			for(var p in this._properties){
				var prop = this._properties[p],
					start = prop.start;
				if(start instanceof Color){
					ret[p] = Color.blendColors(start, prop.end, r, prop.tempColor).toCss();
				}else if(!lang.isArray(start)){
					ret[p] = ((prop.end - start) * r) + start + (p != "opacity" ? prop.units || "px" : 0);
				}
			}
			return ret;
		};
	
		/*=====
		var __AnimArgs = declare(__FadeArgs, {
			// properties: Object?
			//		A hash map of style properties to Objects describing the transition,
			//		such as the properties of _Line with an additional 'units' property
			properties: {}
	
			//TODOC: add event callbacks
		});
		=====*/
	
		basefx.animateProperty = function(/*__AnimArgs*/ args){
			// summary:
			//		Returns an animation that will transition the properties of
			//		node defined in `args` depending how they are defined in
			//		`args.properties`
			//
			// description:
			//		Foundation of most `dojo/_base/fx`
			//		animations. It takes an object of "properties" corresponding to
			//		style properties, and animates them in parallel over a set
			//		duration.
			//
			// example:
			//		A simple animation that changes the width of the specified node.
			//	|	basefx.animateProperty({
			//	|		node: "nodeId",
			//	|		properties: { width: 400 },
			//	|	}).play();
			//		Dojo figures out the start value for the width and converts the
			//		integer specified for the width to the more expressive but
			//		verbose form `{ width: { end: '400', units: 'px' } }` which you
			//		can also specify directly. Defaults to 'px' if omitted.
			//
			// example:
			//		Animate width, height, and padding over 2 seconds... the
			//		pedantic way:
			//	|	basefx.animateProperty({ node: node, duration:2000,
			//	|		properties: {
			//	|			width: { start: '200', end: '400', units:"px" },
			//	|			height: { start:'200', end: '400', units:"px" },
			//	|			paddingTop: { start:'5', end:'50', units:"px" }
			//	|		}
			//	|	}).play();
			//		Note 'paddingTop' is used over 'padding-top'. Multi-name CSS properties
			//		are written using "mixed case", as the hyphen is illegal as an object key.
			//
			// example:
			//		Plug in a different easing function and register a callback for
			//		when the animation ends. Easing functions accept values between
			//		zero and one and return a value on that basis. In this case, an
			//		exponential-in curve.
			//	|	basefx.animateProperty({
			//	|		node: "nodeId",
			//	|		// dojo figures out the start value
			//	|		properties: { width: { end: 400 } },
			//	|		easing: function(n){
			//	|			return (n==0) ? 0 : Math.pow(2, 10 * (n - 1));
			//	|		},
			//	|		onEnd: function(node){
			//	|			// called when the animation finishes. The animation
			//	|			// target is passed to this function
			//	|		}
			//	|	}).play(500); // delay playing half a second
			//
			// example:
			//		Like all `Animation`s, animateProperty returns a handle to the
			//		Animation instance, which fires the events common to Dojo FX. Use `aspect.after`
			//		to access these events outside of the Animation definition:
			//	|	var anim = basefx.animateProperty({
			//	|		node:"someId",
			//	|		properties:{
			//	|			width:400, height:500
			//	|		}
			//	|	});
			//	|	aspect.after(anim, "onEnd", function(){
			//	|		console.log("animation ended");
			//	|	}, true);
			//	|	// play the animation now:
			//	|	anim.play();
			//
			// example:
			//		Each property can be a function whose return value is substituted along.
			//		Additionally, each measurement (eg: start, end) can be a function. The node
			//		reference is passed directly to callbacks.
			//	|	basefx.animateProperty({
			//	|		node:"mine",
			//	|		properties:{
			//	|			height:function(node){
			//	|				// shrink this node by 50%
			//	|				return domGeom.position(node).h / 2
			//	|			},
			//	|			width:{
			//	|				start:function(node){ return 100; },
			//	|				end:function(node){ return 200; }
			//	|			}
			//	|		}
			//	|	}).play();
			//
	
			var n = args.node = dom.byId(args.node);
			if(!args.easing){ args.easing = dojo._defaultEasing; }
	
			var anim = new Animation(args);
			aspect.after(anim, "beforeBegin", lang.hitch(anim, function(){
				var pm = {};
				for(var p in this.properties){
					// Make shallow copy of properties into pm because we overwrite
					// some values below. In particular if start/end are functions
					// we don't want to overwrite them or the functions won't be
					// called if the animation is reused.
					if(p == "width" || p == "height"){
						this.node.display = "block";
					}
					var prop = this.properties[p];
					if(lang.isFunction(prop)){
						prop = prop(n);
					}
					prop = pm[p] = _mixin({}, (lang.isObject(prop) ? prop: { end: prop }));
	
					if(lang.isFunction(prop.start)){
						prop.start = prop.start(n);
					}
					if(lang.isFunction(prop.end)){
						prop.end = prop.end(n);
					}
					var isColor = (p.toLowerCase().indexOf("color") >= 0);
					function getStyle(node, p){
						// domStyle.get(node, "height") can return "auto" or "" on IE; this is more reliable:
						var v = { height: node.offsetHeight, width: node.offsetWidth }[p];
						if(v !== undefined){ return v; }
						v = style.get(node, p);
						return (p == "opacity") ? +v : (isColor ? v : parseFloat(v));
					}
					if(!("end" in prop)){
						prop.end = getStyle(n, p);
					}else if(!("start" in prop)){
						prop.start = getStyle(n, p);
					}
	
					if(isColor){
						prop.start = new Color(prop.start);
						prop.end = new Color(prop.end);
					}else{
						prop.start = (p == "opacity") ? +prop.start : parseFloat(prop.start);
					}
				}
				this.curve = new PropLine(pm);
			}), true);
			aspect.after(anim, "onAnimate", lang.hitch(style, "set", anim.node), true);
			return anim; // Animation
		};
	
		basefx.anim = function(	/*DOMNode|String*/	node,
								/*Object*/			properties,
								/*Integer?*/		duration,
								/*Function?*/		easing,
								/*Function?*/		onEnd,
								/*Integer?*/		delay){
			// summary:
			//		A simpler interface to `animateProperty()`, also returns
			//		an instance of `Animation` but begins the animation
			//		immediately, unlike nearly every other Dojo animation API.
			// description:
			//		Simpler (but somewhat less powerful) version
			//		of `animateProperty`.  It uses defaults for many basic properties
			//		and allows for positional parameters to be used in place of the
			//		packed "property bag" which is used for other Dojo animation
			//		methods.
			//
			//		The `Animation` object returned will be already playing, so
			//		calling play() on it again is (usually) a no-op.
			// node:
			//		a DOM node or the id of a node to animate CSS properties on
			// duration:
			//		The number of milliseconds over which the animation
			//		should run. Defaults to the global animation default duration
			//		(350ms).
			// easing:
			//		An easing function over which to calculate acceleration
			//		and deceleration of the animation through its duration.
			//		A default easing algorithm is provided, but you may
			//		plug in any you wish. A large selection of easing algorithms
			//		are available in `dojo/fx/easing`.
			// onEnd:
			//		A function to be called when the animation finishes
			//		running.
			// delay:
			//		The number of milliseconds to delay beginning the
			//		animation by. The default is 0.
			// example:
			//		Fade out a node
			//	|	basefx.anim("id", { opacity: 0 });
			// example:
			//		Fade out a node over a full second
			//	|	basefx.anim("id", { opacity: 0 }, 1000);
			return basefx.animateProperty({ // Animation
				node: node,
				duration: duration || Animation.prototype.duration,
				properties: properties,
				easing: easing,
				onEnd: onEnd
			}).play(delay || 0);
		};
	
	
		if(has("extend-dojo")){
			_mixin(dojo, basefx);
			// Alias to drop come 2.0:
			dojo._Animation = Animation;
		}
	
		return basefx;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(8), __webpack_require__(28), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, lang, ArrayUtil, config){
	
		var Color = dojo.Color = function(/*Array|String|Object*/ color){
			// summary:
			//		Takes a named string, hex string, array of rgb or rgba values,
			//		an object with r, g, b, and a properties, or another `Color` object
			//		and creates a new Color instance to work from.
			//
			// example:
			//		Work with a Color instance:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		var c = new Color();
			//	|		c.setColor([0,0,0]); // black
			//	|		var hex = c.toHex(); // #000000
			//	|	});
			//
			// example:
			//		Work with a node's color:
			//	| 
			//	|	require(["dojo/_base/color", "dojo/dom-style"], function(Color, domStyle){
			//	|		var color = domStyle("someNode", "backgroundColor");
			//	|		var n = new Color(color);
			//	|		// adjust the color some
			//	|		n.r *= .5;
			//	|		console.log(n.toString()); // rgb(128, 255, 255);
			//	|	});
			if(color){ this.setColor(color); }
		};
	
		// FIXME:
		// there's got to be a more space-efficient way to encode or discover
		// these!! Use hex?
		Color.named = {
			// summary:
			//		Dictionary list of all CSS named colors, by name. Values are 3-item arrays with corresponding RG and B values.
			"black":  [0,0,0],
			"silver": [192,192,192],
			"gray":	  [128,128,128],
			"white":  [255,255,255],
			"maroon": [128,0,0],
			"red":	  [255,0,0],
			"purple": [128,0,128],
			"fuchsia":[255,0,255],
			"green":  [0,128,0],
			"lime":	  [0,255,0],
			"olive":  [128,128,0],
			"yellow": [255,255,0],
			"navy":	  [0,0,128],
			"blue":	  [0,0,255],
			"teal":	  [0,128,128],
			"aqua":	  [0,255,255],
			"transparent": config.transparentColor || [0,0,0,0]
		};
	
		lang.extend(Color, {
			r: 255, g: 255, b: 255, a: 1,
			_set: function(r, g, b, a){
				var t = this; t.r = r; t.g = g; t.b = b; t.a = a;
			},
			setColor: function(/*Array|String|Object*/ color){
				// summary:
				//		Takes a named string, hex string, array of rgb or rgba values,
				//		an object with r, g, b, and a properties, or another `Color` object
				//		and sets this color instance to that value.
				//
				// example:
				//	|	require(["dojo/_base/color"], function(Color){
				//	|		var c = new Color(); // no color
				//	|		c.setColor("#ededed"); // greyish
				//	|	});
				if(lang.isString(color)){
					Color.fromString(color, this);
				}else if(lang.isArray(color)){
					Color.fromArray(color, this);
				}else{
					this._set(color.r, color.g, color.b, color.a);
					if(!(color instanceof Color)){ this.sanitize(); }
				}
				return this;	// Color
			},
			sanitize: function(){
				// summary:
				//		Ensures the object has correct attributes
				// description:
				//		the default implementation does nothing, include dojo.colors to
				//		augment it with real checks
				return this;	// Color
			},
			toRgb: function(){
				// summary:
				//		Returns 3 component array of rgb values
				// example:
				//	|	require(["dojo/_base/color"], function(Color){
				//	|		var c = new Color("#000000");
				//	|		console.log(c.toRgb()); // [0,0,0]
				//	|	});
				var t = this;
				return [t.r, t.g, t.b]; // Array
			},
			toRgba: function(){
				// summary:
				//		Returns a 4 component array of rgba values from the color
				//		represented by this object.
				var t = this;
				return [t.r, t.g, t.b, t.a];	// Array
			},
			toHex: function(){
				// summary:
				//		Returns a CSS color string in hexadecimal representation
				// example:
				//	|	require(["dojo/_base/color"], function(Color){
				//	|		console.log(new Color([0,0,0]).toHex()); // #000000
				//	|	});
				var arr = ArrayUtil.map(["r", "g", "b"], function(x){
					var s = this[x].toString(16);
					return s.length < 2 ? "0" + s : s;
				}, this);
				return "#" + arr.join("");	// String
			},
			toCss: function(/*Boolean?*/ includeAlpha){
				// summary:
				//		Returns a css color string in rgb(a) representation
				// example:
				//	|	require(["dojo/_base/color"], function(Color){
				//	|		var c = new Color("#FFF").toCss();
				//	|		console.log(c); // rgb('255','255','255')
				//	|	});
				var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
				return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";	// String
			},
			toString: function(){
				// summary:
				//		Returns a visual representation of the color
				return this.toCss(true); // String
			}
		});
	
		Color.blendColors = dojo.blendColors = function(
			/*Color*/ start,
			/*Color*/ end,
			/*Number*/ weight,
			/*Color?*/ obj
		){
			// summary:
			//		Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
			//		can reuse a previously allocated Color object for the result
			var t = obj || new Color();
			ArrayUtil.forEach(["r", "g", "b", "a"], function(x){
				t[x] = start[x] + (end[x] - start[x]) * weight;
				if(x != "a"){ t[x] = Math.round(t[x]); }
			});
			return t.sanitize();	// Color
		};
	
		Color.fromRgb = dojo.colorFromRgb = function(/*String*/ color, /*Color?*/ obj){
			// summary:
			//		Returns a `Color` instance from a string of the form
			//		"rgb(...)" or "rgba(...)". Optionally accepts a `Color`
			//		object to update with the parsed value and return instead of
			//		creating a new object.
			// returns:
			//		A Color object. If obj is passed, it will be the return value.
			var m = color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
			return m && Color.fromArray(m[1].split(/\s*,\s*/), obj);	// Color
		};
	
		Color.fromHex = dojo.colorFromHex = function(/*String*/ color, /*Color?*/ obj){
			// summary:
			//		Converts a hex string with a '#' prefix to a color object.
			//		Supports 12-bit #rgb shorthand. Optionally accepts a
			//		`Color` object to update with the parsed value.
			//
			// returns:
			//		A Color object. If obj is passed, it will be the return value.
			//
			// example:
			//	|	require(["dojo/_base/color"], function(Color){
			//	|		var thing = new Color().fromHex("#ededed"); // grey, longhand
			//	|		var thing2 = new Color().fromHex("#000"); // black, shorthand
			//	|	});
			var t = obj || new Color(),
				bits = (color.length == 4) ? 4 : 8,
				mask = (1 << bits) - 1;
			color = Number("0x" + color.substr(1));
			if(isNaN(color)){
				return null; // Color
			}
			ArrayUtil.forEach(["b", "g", "r"], function(x){
				var c = color & mask;
				color >>= bits;
				t[x] = bits == 4 ? 17 * c : c;
			});
			t.a = 1;
			return t;	// Color
		};
	
		Color.fromArray = dojo.colorFromArray = function(/*Array*/ a, /*Color?*/ obj){
			// summary:
			//		Builds a `Color` from a 3 or 4 element array, mapping each
			//		element in sequence to the rgb(a) values of the color.
			// example:
			//		|	require(["dojo/_base/color"], function(Color){
			//		|		var myColor = new Color().fromArray([237,237,237,0.5]); // grey, 50% alpha
			//		|	});
			// returns:
			//		A Color object. If obj is passed, it will be the return value.
			var t = obj || new Color();
			t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
			if(isNaN(t.a)){ t.a = 1; }
			return t.sanitize();	// Color
		};
	
		Color.fromString = dojo.colorFromString = function(/*String*/ str, /*Color?*/ obj){
			// summary:
			//		Parses `str` for a color value. Accepts hex, rgb, and rgba
			//		style color values.
			// description:
			//		Acceptable input values for str may include arrays of any form
			//		accepted by dojo.colorFromArray, hex strings such as "#aaaaaa", or
			//		rgb or rgba strings such as "rgb(133, 200, 16)" or "rgba(10, 10,
			//		10, 50)"
			// returns:
			//		A Color object. If obj is passed, it will be the return value.
			var a = Color.named[str];
			return a && Color.fromArray(a, obj) || Color.fromRgb(str, obj) || Color.fromHex(str, obj);	// Color
		};
	
		return Color;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(8),
		__webpack_require__(21),
		__webpack_require__(2),
		__webpack_require__(28),
		__webpack_require__(19),
		__webpack_require__(142),
		__webpack_require__(13),
		__webpack_require__(15),
		__webpack_require__(23),
		__webpack_require__(70),
		__webpack_require__(6) 
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang, Evented, dojo, arrayUtil, aspect, baseFx, dom, domStyle, geom, ready, require){
	
		// module:
		//		dojo/fx
	
		// For back-compat, remove in 2.0.
		if(!dojo.isAsync){
			ready(0, function(){
				var requires = ["./fx/Toggler"];
				require(requires);	// use indirection so modules not rolled into a build
			});
		}
	
		var coreFx = dojo.fx = {
			// summary:
			//		Effects library on top of Base animations
		};
	
		var _baseObj = {
				_fire: function(evt, args){
					if(this[evt]){
						this[evt].apply(this, args||[]);
					}
					return this;
				}
			};
	
		var _chain = function(animations){
			this._index = -1;
			this._animations = animations||[];
			this._current = this._onAnimateCtx = this._onEndCtx = null;
	
			this.duration = 0;
			arrayUtil.forEach(this._animations, function(a){
				if(a){
					if(typeof a.duration != "undefined"){
		        		this.duration += a.duration;
					}
					if(a.delay){
						this.duration += a.delay;
					}
				}
			}, this);
		};
		_chain.prototype = new Evented();
		lang.extend(_chain, {
			_onAnimate: function(){
				this._fire("onAnimate", arguments);
			},
			_onEnd: function(){
				this._onAnimateCtx.remove();
				this._onEndCtx.remove();
				this._onAnimateCtx = this._onEndCtx = null;
				if(this._index + 1 == this._animations.length){
					this._fire("onEnd");
				}else{
					// switch animations
					this._current = this._animations[++this._index];
					this._onAnimateCtx = aspect.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
					this._onEndCtx = aspect.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
					this._current.play(0, true);
				}
			},
			play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
				if(!this._current){ this._current = this._animations[this._index = 0]; }
				if(!gotoStart && this._current.status() == "playing"){ return this; }
				var beforeBegin = aspect.after(this._current, "beforeBegin", lang.hitch(this, function(){
						this._fire("beforeBegin");
					}), true),
					onBegin = aspect.after(this._current, "onBegin", lang.hitch(this, function(arg){
						this._fire("onBegin", arguments);
					}), true),
					onPlay = aspect.after(this._current, "onPlay", lang.hitch(this, function(arg){
						this._fire("onPlay", arguments);
						beforeBegin.remove();
						onBegin.remove();
						onPlay.remove();
					}));
				if(this._onAnimateCtx){
					this._onAnimateCtx.remove();
				}
				this._onAnimateCtx = aspect.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
				if(this._onEndCtx){
					this._onEndCtx.remove();
				}
				this._onEndCtx = aspect.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
				this._current.play.apply(this._current, arguments);
				return this;
			},
			pause: function(){
				if(this._current){
					var e = aspect.after(this._current, "onPause", lang.hitch(this, function(arg){
							this._fire("onPause", arguments);
							e.remove();
						}), true);
					this._current.pause();
				}
				return this;
			},
			gotoPercent: function(/*Decimal*/percent, /*Boolean?*/ andPlay){
				this.pause();
				var offset = this.duration * percent;
				this._current = null;
	
				arrayUtil.some(this._animations, function(a, index){
					if(offset <= a.duration){
						this._current = a;
						this._index = index;
						return true;
					}
					offset -= a.duration;
					return false;
				}, this);
				if(this._current){
					this._current.gotoPercent(offset / this._current.duration);
				}
				if (andPlay) { this.play(); }
				return this;
			},
			stop: function(/*boolean?*/ gotoEnd){
				if(this._current){
					if(gotoEnd){
						for(; this._index + 1 < this._animations.length; ++this._index){
							this._animations[this._index].stop(true);
						}
						this._current = this._animations[this._index];
					}
					var e = aspect.after(this._current, "onStop", lang.hitch(this, function(arg){
							this._fire("onStop", arguments);
							e.remove();
						}), true);
					this._current.stop();
				}
				return this;
			},
			status: function(){
				return this._current ? this._current.status() : "stopped";
			},
			destroy: function(){
				this.stop();
				if(this._onAnimateCtx){ this._onAnimateCtx.remove(); }
				if(this._onEndCtx){ this._onEndCtx.remove(); }
			}
		});
		lang.extend(_chain, _baseObj);
	
		coreFx.chain = function(/*dojo/_base/fx.Animation[]*/ animations){
			// summary:
			//		Chain a list of `dojo/_base/fx.Animation`s to run in sequence
			//
			// description:
			//		Return a `dojo/_base/fx.Animation` which will play all passed
			//		`dojo/_base/fx.Animation` instances in sequence, firing its own
			//		synthesized events simulating a single animation. (eg:
			//		onEnd of this animation means the end of the chain,
			//		not the individual animations within)
			//
			// example:
			//	Once `node` is faded out, fade in `otherNode`
			//	|	require(["dojo/fx"], function(fx){
			//	|		fx.chain([
			//	|			fx.fadeIn({ node:node }),
			//	|			fx.fadeOut({ node:otherNode })
			//	|		]).play();
			//	|	});
			//
			return new _chain(lang.isArray(animations) ? animations : Array.prototype.slice.call(arguments, 0)); // dojo/_base/fx.Animation
		};
	
		var _combine = function(animations){
			this._animations = animations||[];
			this._connects = [];
			this._finished = 0;
	
			this.duration = 0;
			arrayUtil.forEach(animations, function(a){
				var duration = a.duration;
				if(a.delay){ duration += a.delay; }
				if(this.duration < duration){ this.duration = duration; }
				this._connects.push(aspect.after(a, "onEnd", lang.hitch(this, "_onEnd"), true));
			}, this);
	
			this._pseudoAnimation = new baseFx.Animation({curve: [0, 1], duration: this.duration});
			var self = this;
			arrayUtil.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"],
				function(evt){
					self._connects.push(aspect.after(self._pseudoAnimation, evt,
						function(){ self._fire(evt, arguments); },
					true));
				}
			);
		};
		lang.extend(_combine, {
			_doAction: function(action, args){
				arrayUtil.forEach(this._animations, function(a){
					a[action].apply(a, args);
				});
				return this;
			},
			_onEnd: function(){
				if(++this._finished > this._animations.length){
					this._fire("onEnd");
				}
			},
			_call: function(action, args){
				var t = this._pseudoAnimation;
				t[action].apply(t, args);
			},
			play: function(/*int?*/ delay, /*Boolean?*/ gotoStart){
				this._finished = 0;
				this._doAction("play", arguments);
				this._call("play", arguments);
				return this;
			},
			pause: function(){
				this._doAction("pause", arguments);
				this._call("pause", arguments);
				return this;
			},
			gotoPercent: function(/*Decimal*/percent, /*Boolean?*/ andPlay){
				var ms = this.duration * percent;
				arrayUtil.forEach(this._animations, function(a){
					a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), andPlay);
				});
				this._call("gotoPercent", arguments);
				return this;
			},
			stop: function(/*boolean?*/ gotoEnd){
				this._doAction("stop", arguments);
				this._call("stop", arguments);
				return this;
			},
			status: function(){
				return this._pseudoAnimation.status();
			},
			destroy: function(){
				this.stop();
				arrayUtil.forEach(this._connects, function(handle){
					handle.remove();
				});
			}
		});
		lang.extend(_combine, _baseObj);
	
		coreFx.combine = function(/*dojo/_base/fx.Animation[]*/ animations){
			// summary:
			//		Combine a list of `dojo/_base/fx.Animation`s to run in parallel
			//
			// description:
			//		Combine an array of `dojo/_base/fx.Animation`s or N
			//		`dojo/_base/fx.Animation`s  to run in parallel, providing
			//		a new `dojo/_base/fx.Animation` instance encompassing each
			//		animation, firing standard animation events.
			//
			// example:
			//	Fade out `node` while fading in `otherNode` simultaneously
			//	|	require(["dojo/fx"], function(fx){
			//	|		fx.combine([
			//	|			fx.fadeIn({ node:node }),
			//	|			fx.fadeOut({ node:otherNode })
			//	|		]).play();
			//	|	});
			//
			// example:
			//	When the longest animation ends, execute a function:
			//	|	require(["dojo/fx"], function(fx){
			//	|		var anim = fx.combine([
			//	|			fx.fadeIn({ node: n, duration:700 }),
			//	|			fx.fadeOut({ node: otherNode, duration: 300 })
			//	|		]);
			//	|		aspect.after(anim, "onEnd", function(){
			//	|			// overall animation is done.
			//	|		}, true);
			//	|		anim.play(); // play the animation
			//	|	});
			//
			return new _combine(lang.isArray(animations) ? animations : Array.prototype.slice.call(arguments, 0)); // dojo/_base/fx.Animation
		};
	
		coreFx.wipeIn = function(/*Object*/ args){
			// summary:
			//		Expand a node to it's natural height.
			//
			// description:
			//		Returns an animation that will expand the
			//		node defined in 'args' object from it's current height to
			//		it's natural height (with no scrollbar).
			//		Node must have no margin/border/padding.
			//
			// args: Object
			//		A hash-map of standard `dojo/_base/fx.Animation` constructor properties
			//		(such as easing: node: duration: and so on)
			//
			// example:
			//	|	require(["dojo/fx"], function(fx){
			//	|		fx.wipeIn({
			//	|			node:"someId"
			//	|		}).play()
			//	|	});
	
			var node = args.node = dom.byId(args.node), s = node.style, o;
	
			var anim = baseFx.animateProperty(lang.mixin({
				properties: {
					height: {
						// wrapped in functions so we wait till the last second to query (in case value has changed)
						start: function(){
							// start at current [computed] height, but use 1px rather than 0
							// because 0 causes IE to display the whole panel
							o = s.overflow;
							s.overflow = "hidden";
							if(s.visibility == "hidden" || s.display == "none"){
								s.height = "1px";
								s.display = "";
								s.visibility = "";
								return 1;
							}else{
								var height = domStyle.get(node, "height");
								return Math.max(height, 1);
							}
						},
						end: function(){
							return node.scrollHeight;
						}
					}
				}
			}, args));
	
			var fini = function(){
				s.height = "auto";
				s.overflow = o;
			};
			aspect.after(anim, "onStop", fini, true);
			aspect.after(anim, "onEnd", fini, true);
	
			return anim; // dojo/_base/fx.Animation
		};
	
		coreFx.wipeOut = function(/*Object*/ args){
			// summary:
			//		Shrink a node to nothing and hide it.
			//
			// description:
			//		Returns an animation that will shrink node defined in "args"
			//		from it's current height to 1px, and then hide it.
			//
			// args: Object
			//		A hash-map of standard `dojo/_base/fx.Animation` constructor properties
			//		(such as easing: node: duration: and so on)
			//
			// example:
			//	|	require(["dojo/fx"], function(fx){
			//	|		fx.wipeOut({ node:"someId" }).play()
			//	|	});
	
			var node = args.node = dom.byId(args.node), s = node.style, o;
	
			var anim = baseFx.animateProperty(lang.mixin({
				properties: {
					height: {
						end: 1 // 0 causes IE to display the whole panel
					}
				}
			}, args));
	
			aspect.after(anim, "beforeBegin", function(){
				o = s.overflow;
				s.overflow = "hidden";
				s.display = "";
			}, true);
			var fini = function(){
				s.overflow = o;
				s.height = "auto";
				s.display = "none";
			};
			aspect.after(anim, "onStop", fini, true);
			aspect.after(anim, "onEnd", fini, true);
	
			return anim; // dojo/_base/fx.Animation
		};
	
		coreFx.slideTo = function(/*Object*/ args){
			// summary:
			//		Slide a node to a new top/left position
			//
			// description:
			//		Returns an animation that will slide "node"
			//		defined in args Object from its current position to
			//		the position defined by (args.left, args.top).
			//
			// args: Object
			//		A hash-map of standard `dojo/_base/fx.Animation` constructor properties
			//		(such as easing: node: duration: and so on). Special args members
			//		are `top` and `left`, which indicate the new position to slide to.
			//
			// example:
			//	|	.slideTo({ node: node, left:"40", top:"50", units:"px" }).play()
	
			var node = args.node = dom.byId(args.node),
				top = null, left = null;
	
			var init = (function(n){
				return function(){
					var cs = domStyle.getComputedStyle(n);
					var pos = cs.position;
					top = (pos == 'absolute' ? n.offsetTop : parseInt(cs.top) || 0);
					left = (pos == 'absolute' ? n.offsetLeft : parseInt(cs.left) || 0);
					if(pos != 'absolute' && pos != 'relative'){
						var ret = geom.position(n, true);
						top = ret.y;
						left = ret.x;
						n.style.position="absolute";
						n.style.top=top+"px";
						n.style.left=left+"px";
					}
				};
			})(node);
			init();
	
			var anim = baseFx.animateProperty(lang.mixin({
				properties: {
					top: args.top || 0,
					left: args.left || 0
				}
			}, args));
			aspect.after(anim, "beforeBegin", init, true);
	
			return anim; // dojo/_base/fx.Animation
		};
	
		return coreFx;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang){
	
	// module:
	//		dojo/fx/easing
	
	var easingFuncs = {
		// summary:
		//		Collection of easing functions to use beyond the default
		//		`dojo._defaultEasing` function.
		// description:
		//		Easing functions are used to manipulate the iteration through
		//		an `dojo.Animation`s _Line. _Line being the properties of an Animation,
		//		and the easing function progresses through that Line determining
		//		how quickly (or slowly) it should go. Or more accurately: modify
		//		the value of the _Line based on the percentage of animation completed.
		//
		//		All functions follow a simple naming convention of "ease type" + "when".
		//		If the name of the function ends in Out, the easing described appears
		//		towards the end of the animation. "In" means during the beginning,
		//		and InOut means both ranges of the Animation will applied, both
		//		beginning and end.
		//
		//		One does not call the easing function directly, it must be passed to
		//		the `easing` property of an animation.
		// example:
		//	|	dojo.require("dojo.fx.easing");
		//	|	var anim = dojo.fadeOut({
		//	|		node: 'node',
		//	|		duration: 2000,
		//	|		//	note there is no ()
		//	|		easing: dojo.fx.easing.quadIn
		//	|	}).play();
		//
	
		linear: function(/* Decimal? */n){
			// summary:
			//		A linear easing function
			return n;
		},
	
		quadIn: function(/* Decimal? */n){
			return Math.pow(n, 2);
		},
	
		quadOut: function(/* Decimal? */n){
			return n * (n - 2) * -1;
		},
	
		quadInOut: function(/* Decimal? */n){
			n = n * 2;
			if(n < 1){ return Math.pow(n, 2) / 2; }
			return -1 * ((--n) * (n - 2) - 1) / 2;
		},
	
		cubicIn: function(/* Decimal? */n){
			return Math.pow(n, 3);
		},
	
		cubicOut: function(/* Decimal? */n){
			return Math.pow(n - 1, 3) + 1;
		},
	
		cubicInOut: function(/* Decimal? */n){
			n = n * 2;
			if(n < 1){ return Math.pow(n, 3) / 2; }
			n -= 2;
			return (Math.pow(n, 3) + 2) / 2;
		},
	
		quartIn: function(/* Decimal? */n){
			return Math.pow(n, 4);
		},
	
		quartOut: function(/* Decimal? */n){
			return -1 * (Math.pow(n - 1, 4) - 1);
		},
	
		quartInOut: function(/* Decimal? */n){
			n = n * 2;
			if(n < 1){ return Math.pow(n, 4) / 2; }
			n -= 2;
			return -1 / 2 * (Math.pow(n, 4) - 2);
		},
	
		quintIn: function(/* Decimal? */n){
			return Math.pow(n, 5);
		},
	
		quintOut: function(/* Decimal? */n){
			return Math.pow(n - 1, 5) + 1;
		},
	
		quintInOut: function(/* Decimal? */n){
			n = n * 2;
			if(n < 1){ return Math.pow(n, 5) / 2; }
			n -= 2;
			return (Math.pow(n, 5) + 2) / 2;
		},
	
		sineIn: function(/* Decimal? */n){
			return -1 * Math.cos(n * (Math.PI / 2)) + 1;
		},
	
		sineOut: function(/* Decimal? */n){
			return Math.sin(n * (Math.PI / 2));
		},
	
		sineInOut: function(/* Decimal? */n){
			return -1 * (Math.cos(Math.PI * n) - 1) / 2;
		},
	
		expoIn: function(/* Decimal? */n){
			return (n == 0) ? 0 : Math.pow(2, 10 * (n - 1));
		},
	
		expoOut: function(/* Decimal? */n){
			return (n == 1) ? 1 : (-1 * Math.pow(2, -10 * n) + 1);
		},
	
		expoInOut: function(/* Decimal? */n){
			if(n == 0){ return 0; }
			if(n == 1){ return 1; }
			n = n * 2;
			if(n < 1){ return Math.pow(2, 10 * (n - 1)) / 2; }
			--n;
			return (-1 * Math.pow(2, -10 * n) + 2) / 2;
		},
	
		circIn: function(/* Decimal? */n){
			return -1 * (Math.sqrt(1 - Math.pow(n, 2)) - 1);
		},
	
		circOut: function(/* Decimal? */n){
			n = n - 1;
			return Math.sqrt(1 - Math.pow(n, 2));
		},
	
		circInOut: function(/* Decimal? */n){
			n = n * 2;
			if(n < 1){ return -1 / 2 * (Math.sqrt(1 - Math.pow(n, 2)) - 1); }
			n -= 2;
			return 1 / 2 * (Math.sqrt(1 - Math.pow(n, 2)) + 1);
		},
	
		backIn: function(/* Decimal? */n){
			// summary:
			//		An easing function that starts away from the target,
			//		and quickly accelerates towards the end value.
			//
			//		Use caution when the easing will cause values to become
			//		negative as some properties cannot be set to negative values.
			var s = 1.70158;
			return Math.pow(n, 2) * ((s + 1) * n - s);
		},
	
		backOut: function(/* Decimal? */n){
			// summary:
			//		An easing function that pops past the range briefly, and slowly comes back.
			// description:
			//		An easing function that pops past the range briefly, and slowly comes back.
			//
			//		Use caution when the easing will cause values to become negative as some
			//		properties cannot be set to negative values.
	
			n = n - 1;
			var s = 1.70158;
			return Math.pow(n, 2) * ((s + 1) * n + s) + 1;
		},
	
		backInOut: function(/* Decimal? */n){
			// summary:
			//		An easing function combining the effects of `backIn` and `backOut`
			// description:
			//		An easing function combining the effects of `backIn` and `backOut`.
			//		Use caution when the easing will cause values to become negative
			//		as some properties cannot be set to negative values.
			var s = 1.70158 * 1.525;
			n = n * 2;
			if(n < 1){ return (Math.pow(n, 2) * ((s + 1) * n - s)) / 2; }
			n-=2;
			return (Math.pow(n, 2) * ((s + 1) * n + s) + 2) / 2;
		},
	
		elasticIn: function(/* Decimal? */n){
			// summary:
			//		An easing function the elastically snaps from the start value
			// description:
			//		An easing function the elastically snaps from the start value
			//
			//		Use caution when the elasticity will cause values to become negative
			//		as some properties cannot be set to negative values.
			if(n == 0 || n == 1){ return n; }
			var p = .3;
			var s = p / 4;
			n = n - 1;
			return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
		},
	
		elasticOut: function(/* Decimal? */n){
			// summary:
			//		An easing function that elasticly snaps around the target value,
			//		near the end of the Animation
			// description:
			//		An easing function that elasticly snaps around the target value,
			//		near the end of the Animation
			//
			//		Use caution when the elasticity will cause values to become
			//		negative as some properties cannot be set to negative values.
			if(n==0 || n == 1){ return n; }
			var p = .3;
			var s = p / 4;
			return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
		},
	
		elasticInOut: function(/* Decimal? */n){
			// summary:
			//		An easing function that elasticly snaps around the value, near
			//		the beginning and end of the Animation.
			// description:
			//		An easing function that elasticly snaps around the value, near
			//		the beginning and end of the Animation.
			//
			//		Use caution when the elasticity will cause values to become
			//		negative as some properties cannot be set to negative values.
			if(n == 0) return 0;
			n = n * 2;
			if(n == 2) return 1;
			var p = .3 * 1.5;
			var s = p / 4;
			if(n < 1){
				n -= 1;
				return -.5 * (Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p));
			}
			n -= 1;
			return .5 * (Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p)) + 1;
		},
	
		bounceIn: function(/* Decimal? */n){
			// summary:
			//		An easing function that 'bounces' near the beginning of an Animation
			return (1 - easingFuncs.bounceOut(1 - n)); // Decimal
		},
	
		bounceOut: function(/* Decimal? */n){
			// summary:
			//		An easing function that 'bounces' near the end of an Animation
			var s = 7.5625;
			var p = 2.75;
			var l;
			if(n < (1 / p)){
				l = s * Math.pow(n, 2);
			}else if(n < (2 / p)){
				n -= (1.5 / p);
				l = s * Math.pow(n, 2) + .75;
			}else if(n < (2.5 / p)){
				n -= (2.25 / p);
				l = s * Math.pow(n, 2) + .9375;
			}else{
				n -= (2.625 / p);
				l = s * Math.pow(n, 2) + .984375;
			}
			return l;
		},
	
		bounceInOut: function(/* Decimal? */n){
			// summary:
			//		An easing function that 'bounces' at the beginning and end of the Animation
			if(n < 0.5){ return easingFuncs.bounceIn(n * 2) / 2; }
			return (easingFuncs.bounceOut(n * 2 - 1) / 2) + 0.5; // Decimal
		}
	};
	
	lang.setObject("dojo.fx.easing", easingFuncs);
	
	return easingFuncs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }

/******/ });
//# sourceMappingURL=dojo_01_animation.bundle.js.map