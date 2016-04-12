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

	// Example from: https://dojotoolkit.org/documentation/tutorials/1.10/key_events/index.html
	var dom = __webpack_require__(13);
	var domConstruct = __webpack_require__(11);
	var on = __webpack_require__(18);
	var query = __webpack_require__(34);
	var keys = __webpack_require__(26);
	__webpack_require__(209);
	
	var inputs = query("input");
	
	function log(msg){
	    var c = dom.byId("console");
	    if(!c){
	        c = domConstruct.create("div", {
	            id: "console"
	        }, document.body);
	    }
	    c.innerHTML += "<div>" + msg + "</div>";
	}
	
	on(dom.byId("traverseForm"), "keydown", function(event) {
	    var node = query.NodeList([event.target]);
	    var nextNode;
	
	    //on listens for the keydown events inside of the div node, on all form elements
	    switch(event.keyCode) {
	        case keys.UP_ARROW:
	            nextNode = node.prev("input");
	            if(nextNode[0]){
	                //if not first element
	                nextNode[0].focus();
	                //moving the focus from the current element to the previous
	            }
	            break;
	        case keys.DOWN_ARROW:
	            nextNode = node.next("input");
	            if(nextNode[0]){
	                //if not last element
	                nextNode[0].focus();
	                //moving the focus from the current element to the next
	            }
	            break;
	        case keys.HOME:
	            inputs[0].focus();
	            break;
	        case keys.END:
	            inputs[inputs.length - 2].focus();
	            break;
	        case keys.ENTER:
	            event.preventDefault();
	            //prevent default keeps the form from submitting when the enter button is pressed
	            //on the submit button
	            if(event.target.type !== "submit"){
	                nextNode = node.next("input");
	                if(nextNode[0]){
	                    //if not last element
	                    nextNode[0].focus();
	                    //moving the focus from the current element to the next
	                }
	            }else {
	                // submit the form
	                log("form submitted!");
	            }
	            break;
	        default:
	            log("some other key: " + event.keyCode);
	    }
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

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(9), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, dojo, has, win, dom, attr){
		// module:
		//		dojo/dom-construct
		// summary:
		//		This module defines the core dojo DOM construction API.
	
		// TODOC: summary not showing up in output, see https://github.com/csnover/js-doc-parse/issues/42
	
		// support stuff for toDom()
		var tagWrap = {
				option: ["select"],
				tbody: ["table"],
				thead: ["table"],
				tfoot: ["table"],
				tr: ["table", "tbody"],
				td: ["table", "tbody", "tr"],
				th: ["table", "thead", "tr"],
				legend: ["fieldset"],
				caption: ["table"],
				colgroup: ["table"],
				col: ["table", "colgroup"],
				li: ["ul"]
			},
			reTag = /<\s*([\w\:]+)/,
			masterNode = {}, masterNum = 0,
			masterName = "__" + dojo._scopeName + "ToDomId";
	
		// generate start/end tag strings to use
		// for the injection for each special tag wrap case.
		for(var param in tagWrap){
			if(tagWrap.hasOwnProperty(param)){
				var tw = tagWrap[param];
				tw.pre = param == "option" ? '<select multiple="multiple">' : "<" + tw.join("><") + ">";
				tw.post = "</" + tw.reverse().join("></") + ">";
				// the last line is destructive: it reverses the array,
				// but we don't care at this point
			}
		}
	
		var html5domfix;
		if(has("ie") <= 8){
			html5domfix = function(doc){
				doc.__dojo_html5_tested = "yes";
				var div = create('div', {innerHTML: "<nav>a</nav>", style: {visibility: "hidden"}}, doc.body);
				if(div.childNodes.length !== 1){
					('abbr article aside audio canvas details figcaption figure footer header ' +
					'hgroup mark meter nav output progress section summary time video').replace(
						/\b\w+\b/g, function(n){
							doc.createElement(n);
						}
					);
				}
				destroy(div);
			}
		}
	
		function _insertBefore(/*DomNode*/ node, /*DomNode*/ ref){
			var parent = ref.parentNode;
			if(parent){
				parent.insertBefore(node, ref);
			}
		}
	
		function _insertAfter(/*DomNode*/ node, /*DomNode*/ ref){
			// summary:
			//		Try to insert node after ref
			var parent = ref.parentNode;
			if(parent){
				if(parent.lastChild == ref){
					parent.appendChild(node);
				}else{
					parent.insertBefore(node, ref.nextSibling);
				}
			}
		}
	
		exports.toDom = function toDom(frag, doc){
			// summary:
			//		instantiates an HTML fragment returning the corresponding DOM.
			// frag: String
			//		the HTML fragment
			// doc: DocumentNode?
			//		optional document to use when creating DOM nodes, defaults to
			//		dojo/_base/window.doc if not specified.
			// returns:
			//		Document fragment, unless it's a single node in which case it returns the node itself
			// example:
			//		Create a table row:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		var tr = domConstruct.toDom("<tr><td>First!</td></tr>");
			//	|	});
	
			doc = doc || win.doc;
			var masterId = doc[masterName];
			if(!masterId){
				doc[masterName] = masterId = ++masterNum + "";
				masterNode[masterId] = doc.createElement("div");
			}
	
			if(has("ie") <= 8){
				if(!doc.__dojo_html5_tested && doc.body){
					html5domfix(doc);
				}
			}
	
			// make sure the frag is a string.
			frag += "";
	
			// find the starting tag, and get node wrapper
			var match = frag.match(reTag),
				tag = match ? match[1].toLowerCase() : "",
				master = masterNode[masterId],
				wrap, i, fc, df;
			if(match && tagWrap[tag]){
				wrap = tagWrap[tag];
				master.innerHTML = wrap.pre + frag + wrap.post;
				for(i = wrap.length; i; --i){
					master = master.firstChild;
				}
			}else{
				master.innerHTML = frag;
			}
	
			// one node shortcut => return the node itself
			if(master.childNodes.length == 1){
				return master.removeChild(master.firstChild); // DOMNode
			}
	
			// return multiple nodes as a document fragment
			df = doc.createDocumentFragment();
			while((fc = master.firstChild)){ // intentional assignment
				df.appendChild(fc);
			}
			return df; // DocumentFragment
		};
	
		exports.place = function place(node, refNode, position){
			// summary:
			//		Attempt to insert node into the DOM, choosing from various positioning options.
			//		Returns the first argument resolved to a DOM node.
			// node: DOMNode|DocumentFragment|String
			//		id or node reference, or HTML fragment starting with "<" to place relative to refNode
			// refNode: DOMNode|String
			//		id or node reference to use as basis for placement
			// position: String|Number?
			//		string noting the position of node relative to refNode or a
			//		number indicating the location in the childNodes collection of refNode.
			//		Accepted string values are:
			//
			//		- before
			//		- after
			//		- replace
			//		- only
			//		- first
			//		- last
			//
			//		"first" and "last" indicate positions as children of refNode, "replace" replaces refNode,
			//		"only" replaces all children.  position defaults to "last" if not specified
			// returns: DOMNode
			//		Returned values is the first argument resolved to a DOM node.
			//
			//		.place() is also a method of `dojo/NodeList`, allowing `dojo/query` node lookups.
			// example:
			//		Place a node by string id as the last child of another node by string id:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		domConstruct.place("someNode", "anotherNode");
			//	|	});
			// example:
			//		Place a node by string id before another node by string id
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		domConstruct.place("someNode", "anotherNode", "before");
			//	|	});
			// example:
			//		Create a Node, and place it in the body element (last child):
			//	|	require(["dojo/dom-construct", "dojo/_base/window"
			//	|	], function(domConstruct, win){
			//	|		domConstruct.place("<div></div>", win.body());
			//	|	});
			// example:
			//		Put a new LI as the first child of a list by id:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		domConstruct.place("<li></li>", "someUl", "first");
			//	|	});
	
			refNode = dom.byId(refNode);
			if(typeof node == "string"){ // inline'd type check
				node = /^\s*</.test(node) ? exports.toDom(node, refNode.ownerDocument) : dom.byId(node);
			}
			if(typeof position == "number"){ // inline'd type check
				var cn = refNode.childNodes;
				if(!cn.length || cn.length <= position){
					refNode.appendChild(node);
				}else{
					_insertBefore(node, cn[position < 0 ? 0 : position]);
				}
			}else{
				switch(position){
					case "before":
						_insertBefore(node, refNode);
						break;
					case "after":
						_insertAfter(node, refNode);
						break;
					case "replace":
						refNode.parentNode.replaceChild(node, refNode);
						break;
					case "only":
						exports.empty(refNode);
						refNode.appendChild(node);
						break;
					case "first":
						if(refNode.firstChild){
							_insertBefore(node, refNode.firstChild);
							break;
						}
						// else fallthrough...
					default: // aka: last
						refNode.appendChild(node);
				}
			}
			return node; // DomNode
		};
	
		var create = exports.create = function create(/*DOMNode|String*/ tag, /*Object*/ attrs, /*DOMNode|String?*/ refNode, /*String?*/ pos){
			// summary:
			//		Create an element, allowing for optional attribute decoration
			//		and placement.
			// description:
			//		A DOM Element creation function. A shorthand method for creating a node or
			//		a fragment, and allowing for a convenient optional attribute setting step,
			//		as well as an optional DOM placement reference.
			//
			//		Attributes are set by passing the optional object through `dojo/dom-attr.set`.
			//		See `dojo/dom-attr.set` for noted caveats and nuances, and API if applicable.
			//
			//		Placement is done via `dojo/dom-construct.place`, assuming the new node to be
			//		the action node, passing along the optional reference node and position.
			// tag: DOMNode|String
			//		A string of the element to create (eg: "div", "a", "p", "li", "script", "br"),
			//		or an existing DOM node to process.
			// attrs: Object
			//		An object-hash of attributes to set on the newly created node.
			//		Can be null, if you don't want to set any attributes/styles.
			//		See: `dojo/dom-attr.set` for a description of available attributes.
			// refNode: DOMNode|String?
			//		Optional reference node. Used by `dojo/dom-construct.place` to place the newly created
			//		node somewhere in the dom relative to refNode. Can be a DomNode reference
			//		or String ID of a node.
			// pos: String?
			//		Optional positional reference. Defaults to "last" by way of `dojo/domConstruct.place`,
			//		though can be set to "first","after","before","last", "replace" or "only"
			//		to further control the placement of the new node relative to the refNode.
			//		'refNode' is required if a 'pos' is specified.
			// example:
			//		Create a DIV:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		var n = domConstruct.create("div");
			//	|	});
			//
			// example:
			//		Create a DIV with content:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		var n = domConstruct.create("div", { innerHTML:"<p>hi</p>" });
			//	|	});
			//
			// example:
			//		Place a new DIV in the BODY, with no attributes set
			//	|	require(["dojo/dom-construct", "dojo/_base/window"], function(domConstruct, win){
			//	|		var n = domConstruct.create("div", null, win.body());
			//	|	});
			//
			// example:
			//		Create an UL, and populate it with LI's. Place the list as the first-child of a
			//		node with id="someId":
			//	|	require(["dojo/dom-construct", "dojo/_base/array"],
			//	|	function(domConstruct, arrayUtil){
			//	|		var ul = domConstruct.create("ul", null, "someId", "first");
			//	|		var items = ["one", "two", "three", "four"];
			//	|		arrayUtil.forEach(items, function(data){
			//	|			domConstruct.create("li", { innerHTML: data }, ul);
			//	|		});
			//	|	});
			//
			// example:
			//		Create an anchor, with an href. Place in BODY:
			//	|	require(["dojo/dom-construct", "dojo/_base/window"], function(domConstruct, win){
			//	|		domConstruct.create("a", { href:"foo.html", title:"Goto FOO!" }, win.body());
			//	|	});
	
			var doc = win.doc;
			if(refNode){
				refNode = dom.byId(refNode);
				doc = refNode.ownerDocument;
			}
			if(typeof tag == "string"){ // inline'd type check
				tag = doc.createElement(tag);
			}
			if(attrs){ attr.set(tag, attrs); }
			if(refNode){ exports.place(tag, refNode, pos); }
			return tag; // DomNode
		};
	
		function _empty(/*DomNode*/ node){
			// TODO: remove this if() block in 2.0 when we no longer have to worry about IE memory leaks,
			// and then uncomment the emptyGrandchildren() test case from html.html.
			// Note that besides fixing #16957, using removeChild() is actually faster than setting node.innerHTML,
			// see http://jsperf.com/clear-dom-node.
			if("innerHTML" in node){
				try{
					// fast path
					node.innerHTML = "";
					return;
				}catch(e){
					// innerHTML is readOnly (e.g. TABLE (sub)elements in quirks mode)
					// Fall through (saves bytes)
				}
			}
	
			// SVG/strict elements don't support innerHTML
			for(var c; c = node.lastChild;){ // intentional assignment
				node.removeChild(c);
			}
		}
	
		exports.empty = function empty(/*DOMNode|String*/ node){
			// summary:
			//		safely removes all children of the node.
			// node: DOMNode|String
			//		a reference to a DOM node or an id.
			// example:
			//		Destroy node's children byId:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		domConstruct.empty("someId");
			//	|	});
	
			_empty(dom.byId(node));
		};
	
	
		function _destroy(/*DomNode*/ node, /*DomNode*/ parent){
			// in IE quirks, node.canHaveChildren can be false but firstChild can be non-null (OBJECT/APPLET)
			if(node.firstChild){
				_empty(node);
			}
			if(parent){
				// removeNode(false) doesn't leak in IE 6+, but removeChild() and removeNode(true) are known to leak under IE 8- while 9+ is TBD.
				// In IE quirks mode, PARAM nodes as children of OBJECT/APPLET nodes have a removeNode method that does nothing and
				// the parent node has canHaveChildren=false even though removeChild correctly removes the PARAM children.
				// In IE, SVG/strict nodes don't have a removeNode method nor a canHaveChildren boolean.
				has("ie") && parent.canHaveChildren && "removeNode" in node ? node.removeNode(false) : parent.removeChild(node);
			}
		}
		var destroy = exports.destroy = function destroy(/*DOMNode|String*/ node){
			// summary:
			//		Removes a node from its parent, clobbering it and all of its
			//		children.
			//
			// description:
			//		Removes a node from its parent, clobbering it and all of its
			//		children. Function only works with DomNodes, and returns nothing.
			//
			// node: DOMNode|String
			//		A String ID or DomNode reference of the element to be destroyed
			//
			// example:
			//		Destroy a node byId:
			//	|	require(["dojo/dom-construct"], function(domConstruct){
			//	|		domConstruct.destroy("someId");
			//	|	});
	
			node = dom.byId(node);
			if(!node){ return; }
			_destroy(node, node.parentNode);
		};
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

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(9), __webpack_require__(8), __webpack_require__(13), __webpack_require__(15), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, has, lang, dom, style, prop){
		// module:
		//		dojo/dom-attr
		// summary:
		//		This module defines the core dojo DOM attributes API.
	
		// TODOC: summary not showing up in output see https://github.com/csnover/js-doc-parse/issues/42
	
		// =============================
		// Element attribute Functions
		// =============================
	
		// This module will be obsolete soon. Use dojo/prop instead.
	
		// dojo/dom-attr.get() should conform to http://www.w3.org/TR/DOM-Level-2-Core/
	
		// attribute-related functions (to be obsolete soon)
		var forcePropNames = {
				innerHTML:	1,
				textContent:1,
				className:	1,
				htmlFor:	has("ie"),
				value:		1
			},
			attrNames = {
				// original attribute names
				classname: "class",
				htmlfor: "for",
				// for IE
				tabindex: "tabIndex",
				readonly: "readOnly"
			};
	
		function _hasAttr(node, name){
			var attr = node.getAttributeNode && node.getAttributeNode(name);
			return !!attr && attr.specified; // Boolean
		}
		
		// There is a difference in the presence of certain properties and their default values
		// between browsers. For example, on IE "disabled" is present on all elements,
		// but it is value is "false"; "tabIndex" of <div> returns 0 by default on IE, yet other browsers
		// can return -1.
	
		exports.has = function hasAttr(/*DOMNode|String*/ node, /*String*/ name){
			// summary:
			//		Returns true if the requested attribute is specified on the
			//		given element, and false otherwise.
			// node: DOMNode|String
			//		id or reference to the element to check
			// name: String
			//		the name of the attribute
			// returns: Boolean
			//		true if the requested attribute is specified on the
			//		given element, and false otherwise
	
			var lc = name.toLowerCase();
			return forcePropNames[prop.names[lc] || name] || _hasAttr(dom.byId(node), attrNames[lc] || name);	// Boolean
		};
	
		exports.get = function getAttr(/*DOMNode|String*/ node, /*String*/ name){
			// summary:
			//		Gets an attribute on an HTML element.
			// description:
			//		Handles normalized getting of attributes on DOM Nodes.
			// node: DOMNode|String
			//		id or reference to the element to get the attribute on
			// name: String
			//		the name of the attribute to get.
			// returns:
			//		the value of the requested attribute or null if that attribute does not have a specified or
			//		default value;
			//
			// example:
			//	|	// get the current value of the "foo" attribute on a node
			//	|	require(["dojo/dom-attr", "dojo/dom"], function(domAttr, dom){
			//	|		domAttr.get(dom.byId("nodeId"), "foo");
			//	|		// or we can just pass the id:
			//	|		domAttr.get("nodeId", "foo");
			//	|	});	
			//	|	
	
			node = dom.byId(node);
			var lc = name.toLowerCase(),
				propName = prop.names[lc] || name,
				forceProp = forcePropNames[propName],
				value = node[propName];		// should we access this attribute via a property or via getAttribute()?
	
			if(forceProp && typeof value != "undefined"){
				// node's property
				return value;	// Anything
			}
			
			if(propName == "textContent"){
				return prop.get(node, propName);
			}
			
			if(propName != "href" && (typeof value == "boolean" || lang.isFunction(value))){
				// node's property
				return value;	// Anything
			}
			// node's attribute
			// we need _hasAttr() here to guard against IE returning a default value
			var attrName = attrNames[lc] || name;
			return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
		};
	
		exports.set = function setAttr(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
			// summary:
			//		Sets an attribute on an HTML element.
			// description:
			//		Handles normalized setting of attributes on DOM Nodes.
			//
			//		When passing functions as values, note that they will not be
			//		directly assigned to slots on the node, but rather the default
			//		behavior will be removed and the new behavior will be added
			//		using `dojo.connect()`, meaning that event handler properties
			//		will be normalized and that some caveats with regards to
			//		non-standard behaviors for onsubmit apply. Namely that you
			//		should cancel form submission using `dojo.stopEvent()` on the
			//		passed event object instead of returning a boolean value from
			//		the handler itself.
			// node: DOMNode|String
			//		id or reference to the element to set the attribute on
			// name: String|Object
			//		the name of the attribute to set, or a hash of key-value pairs to set.
			// value: String?
			//		the value to set for the attribute, if the name is a string.
			// returns:
			//		the DOM node
			//
			// example:
			//	|	// use attr() to set the tab index
			//	|	require(["dojo/dom-attr"], function(domAttr){
			//	|		domAttr.set("nodeId", "tabIndex", 3);
			//	|	});
			//
			// example:
			//	Set multiple values at once, including event handlers:
			//	|	require(["dojo/dom-attr"],
			//	|	function(domAttr){
			//	|		domAttr.set("formId", {
			//	|			"foo": "bar",
			//	|			"tabIndex": -1,
			//	|			"method": "POST"
			//	|		}
			//	|	});
	
			node = dom.byId(node);
			if(arguments.length == 2){ // inline'd type check
				// the object form of setter: the 2nd argument is a dictionary
				for(var x in name){
					exports.set(node, x, name[x]);
				}
				return node; // DomNode
			}
			var lc = name.toLowerCase(),
				propName = prop.names[lc] || name,
				forceProp = forcePropNames[propName];
			if(propName == "style" && typeof value != "string"){ // inline'd type check
				// special case: setting a style
				style.set(node, value);
				return node; // DomNode
			}
			if(forceProp || typeof value == "boolean" || lang.isFunction(value)){
				return prop.set(node, name, value);
			}
			// node's attribute
			node.setAttribute(attrNames[lc] || name, value);
			return node; // DomNode
		};
	
		exports.remove = function removeAttr(/*DOMNode|String*/ node, /*String*/ name){
			// summary:
			//		Removes an attribute from an HTML element.
			// node: DOMNode|String
			//		id or reference to the element to remove the attribute from
			// name: String
			//		the name of the attribute to remove
	
			dom.byId(node).removeAttribute(attrNames[name.toLowerCase()] || name);
		};
	
		exports.getNodeProp = function getNodeProp(/*DomNode|String*/ node, /*String*/ name){
			// summary:
			//		Returns an effective value of a property or an attribute.
			// node: DOMNode|String
			//		id or reference to the element to remove the attribute from
			// name: String
			//		the name of the attribute
			// returns:
			//		the value of the attribute
	
			node = dom.byId(node);
			var lc = name.toLowerCase(), propName = prop.names[lc] || name;
			if((propName in node) && propName != "href"){
				// node's property
				return node[propName];	// Anything
			}
			// node's attribute
			var attrName = attrNames[lc] || name;
			return _hasAttr(node, attrName) ? node.getAttribute(attrName) : null; // Anything
		};
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

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2), __webpack_require__(9), __webpack_require__(8), __webpack_require__(13), __webpack_require__(15), __webpack_require__(11), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, dojo, has, lang, dom, style, ctr, conn){
		// module:
		//		dojo/dom-prop
		// summary:
		//		This module defines the core dojo DOM properties API.
	
		// TODOC: summary not showing up in output, see https://github.com/csnover/js-doc-parse/issues/42
	
		// =============================
		// Element properties Functions
		// =============================
	
		// helper to connect events
		var _evtHdlrMap = {}, _ctr = 1, _attrId = dojo._scopeName + "attrid";
		has.add('dom-textContent', function (global, doc, element) { return 'textContent' in element; });
	
		exports.names = {
			// properties renamed to avoid clashes with reserved words
			"class": "className",
			"for": "htmlFor",
			// properties written as camelCase
			tabindex: "tabIndex",
			readonly: "readOnly",
			colspan: "colSpan",
			frameborder: "frameBorder",
			rowspan: "rowSpan",
			textcontent: "textContent",
			valuetype: "valueType"
		};
		
		function getText(/*DOMNode*/node){
			// summary:
			//		recursion method for get('textContent') to use. Gets text value for a node.
			// description:
			//		Juse uses nodedValue so things like <br/> tags do not end up in
			//		the text as any sort of line return.
			var text = "", ch = node.childNodes;
			for(var i = 0, n; n = ch[i]; i++){
				//Skip comments.
				if(n.nodeType != 8){
					if(n.nodeType == 1){
						text += getText(n);
					}else{
						text += n.nodeValue;
					}
				}
			}
			return text;
		}
	
		exports.get = function getProp(/*DOMNode|String*/ node, /*String*/ name){
			// summary:
			//		Gets a property on an HTML element.
			// description:
			//		Handles normalized getting of properties on DOM nodes.
			//
			// node: DOMNode|String
			//		id or reference to the element to get the property on
			// name: String
			//		the name of the property to get.
			// returns:
			//		the value of the requested property or its default value
			//
			// example:
			//	|	// get the current value of the "foo" property on a node
			//	|	require(["dojo/dom-prop", "dojo/dom"], function(domProp, dom){
			//	|		domProp.get(dom.byId("nodeId"), "foo");
			//	|		// or we can just pass the id:
			//	|		domProp.get("nodeId", "foo");
			//	|	});
	
			node = dom.byId(node);
			var lc = name.toLowerCase(), propName = exports.names[lc] || name;
			
			if(propName == "textContent" && !has("dom-textContent")){
				return getText(node);
			}
			
			return node[propName];	// Anything
		};
	
		exports.set = function setProp(/*DOMNode|String*/ node, /*String|Object*/ name, /*String?*/ value){
			// summary:
			//		Sets a property on an HTML element.
			// description:
			//		Handles normalized setting of properties on DOM nodes.
			//
			//		When passing functions as values, note that they will not be
			//		directly assigned to slots on the node, but rather the default
			//		behavior will be removed and the new behavior will be added
			//		using `dojo.connect()`, meaning that event handler properties
			//		will be normalized and that some caveats with regards to
			//		non-standard behaviors for onsubmit apply. Namely that you
			//		should cancel form submission using `dojo.stopEvent()` on the
			//		passed event object instead of returning a boolean value from
			//		the handler itself.
			// node: DOMNode|String
			//		id or reference to the element to set the property on
			// name: String|Object
			//		the name of the property to set, or a hash object to set
			//		multiple properties at once.
			// value: String?
			//		The value to set for the property
			// returns:
			//		the DOM node
			//
			// example:
			//	|	// use prop() to set the tab index
			//	|	require(["dojo/dom-prop"], function(domProp){
			//	|		domProp.set("nodeId", "tabIndex", 3);
			//	|	});
			//
			// example:
			//	Set multiple values at once, including event handlers:
			//	|	require(["dojo/dom-prop"], function(domProp){
			//	|		domProp.set("formId", {
			//	|			"foo": "bar",
			//	|			"tabIndex": -1,
			//	|			"method": "POST",
			//	|		});
			//	|	});
	
			node = dom.byId(node);
			var l = arguments.length;
			if(l == 2 && typeof name != "string"){ // inline'd type check
				// the object form of setter: the 2nd argument is a dictionary
				for(var x in name){
					exports.set(node, x, name[x]);
				}
				return node; // DomNode
			}
			var lc = name.toLowerCase(), propName = exports.names[lc] || name;
			if(propName == "style" && typeof value != "string"){ // inline'd type check
				// special case: setting a style
				style.set(node, value);
				return node; // DomNode
			}
			if(propName == "innerHTML"){
				// special case: assigning HTML
				// the hash lists elements with read-only innerHTML on IE
				if(has("ie") && node.tagName.toLowerCase() in {col: 1, colgroup: 1,
							table: 1, tbody: 1, tfoot: 1, thead: 1, tr: 1, title: 1}){
					ctr.empty(node);
					node.appendChild(ctr.toDom(value, node.ownerDocument));
				}else{
					node[propName] = value;
				}
				return node; // DomNode
			}
			if(propName == "textContent" && !has("dom-textContent")) {
				ctr.empty(node);
				node.appendChild(node.ownerDocument.createTextNode(value));
				return node;
			}
			if(lang.isFunction(value)){
				// special case: assigning an event handler
				// clobber if we can
				var attrId = node[_attrId];
				if(!attrId){
					attrId = _ctr++;
					node[_attrId] = attrId;
				}
				if(!_evtHdlrMap[attrId]){
					_evtHdlrMap[attrId] = {};
				}
				var h = _evtHdlrMap[attrId][propName];
				if(h){
					//h.remove();
					conn.disconnect(h);
				}else{
					try{
						delete node[propName];
					}catch(e){}
				}
				// ensure that event objects are normalized, etc.
				if(value){
					//_evtHdlrMap[attrId][propName] = on(node, propName, value);
					_evtHdlrMap[attrId][propName] = conn.connect(node, propName, value);
				}else{
					node[propName] = null;
				}
				return node; // DomNode
			}
			node[propName] = value;
			return node;	// DomNode
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(18), __webpack_require__(20), __webpack_require__(19), __webpack_require__(22), __webpack_require__(24), __webpack_require__(25), __webpack_require__(8), __webpack_require__(26)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, on, hub, aspect, eventModule, mouse, has, lang){
	// module:
	//		dojo/_base/connect
	
	has.add("events-keypress-typed", function(){ // keypresses should only occur a printable character is hit
		var testKeyEvent = {charCode: 0};
		try{
			testKeyEvent = document.createEvent("KeyboardEvent");
			(testKeyEvent.initKeyboardEvent || testKeyEvent.initKeyEvent).call(testKeyEvent, "keypress", true, true, null, false, false, false, false, 9, 3);
		}catch(e){}
		return testKeyEvent.charCode == 0 && !has("opera");
	});
	
	function connect_(obj, event, context, method, dontFix){
		method = lang.hitch(context, method);
		if(!obj || !(obj.addEventListener || obj.attachEvent)){
			// it is a not a DOM node and we are using the dojo.connect style of treating a
			// method like an event, must go right to aspect
			return aspect.after(obj || dojo.global, event, method, true);
		}
		if(typeof event == "string" && event.substring(0, 2) == "on"){
			event = event.substring(2);
		}
		if(!obj){
			obj = dojo.global;
		}
		if(!dontFix){
			switch(event){
				// dojo.connect has special handling for these event types
				case "keypress":
					event = keypress;
					break;
				case "mouseenter":
					event = mouse.enter;
					break;
				case "mouseleave":
					event = mouse.leave;
					break;
			}
		}
		return on(obj, event, method, dontFix);
	}
	
	var _punctMap = {
		106:42,
		111:47,
		186:59,
		187:43,
		188:44,
		189:45,
		190:46,
		191:47,
		192:96,
		219:91,
		220:92,
		221:93,
		222:39,
		229:113
	};
	var evtCopyKey = has("mac") ? "metaKey" : "ctrlKey";
	
	
	var _synthesizeEvent = function(evt, props){
		var faux = lang.mixin({}, evt, props);
		setKeyChar(faux);
		// FIXME: would prefer to use lang.hitch: lang.hitch(evt, evt.preventDefault);
		// but it throws an error when preventDefault is invoked on Safari
		// does Event.preventDefault not support "apply" on Safari?
		faux.preventDefault = function(){ evt.preventDefault(); };
		faux.stopPropagation = function(){ evt.stopPropagation(); };
		return faux;
	};
	function setKeyChar(evt){
		evt.keyChar = evt.charCode ? String.fromCharCode(evt.charCode) : '';
		evt.charOrCode = evt.keyChar || evt.keyCode;
	}
	var keypress;
	if(has("events-keypress-typed")){
		// this emulates Firefox's keypress behavior where every keydown can correspond to a keypress
		var _trySetKeyCode = function(e, code){
			try{
				// squelch errors when keyCode is read-only
				// (e.g. if keyCode is ctrl or shift)
				return (e.keyCode = code);
			}catch(e){
				return 0;
			}
		};
		keypress = function(object, listener){
			var keydownSignal = on(object, "keydown", function(evt){
				// munge key/charCode
				var k=evt.keyCode;
				// These are Windows Virtual Key Codes
				// http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/WinUI/WindowsUserInterface/UserInput/VirtualKeyCodes.asp
				var unprintable = (k!=13) && k!=32 && (k!=27||!has("ie")) && (k<48||k>90) && (k<96||k>111) && (k<186||k>192) && (k<219||k>222) && k!=229;
				// synthesize keypress for most unprintables and CTRL-keys
				if(unprintable||evt.ctrlKey){
					var c = unprintable ? 0 : k;
					if(evt.ctrlKey){
						if(k==3 || k==13){
							return listener.call(evt.currentTarget, evt); // IE will post CTRL-BREAK, CTRL-ENTER as keypress natively
						}else if(c>95 && c<106){
							c -= 48; // map CTRL-[numpad 0-9] to ASCII
						}else if((!evt.shiftKey)&&(c>=65&&c<=90)){
							c += 32; // map CTRL-[A-Z] to lowercase
						}else{
							c = _punctMap[c] || c; // map other problematic CTRL combinations to ASCII
						}
					}
					// simulate a keypress event
					var faux = _synthesizeEvent(evt, {type: 'keypress', faux: true, charCode: c});
					listener.call(evt.currentTarget, faux);
					if(has("ie")){
						_trySetKeyCode(evt, faux.keyCode);
					}
				}
			});
			var keypressSignal = on(object, "keypress", function(evt){
				var c = evt.charCode;
				c = c>=32 ? c : 0;
				evt = _synthesizeEvent(evt, {charCode: c, faux: true});
				return listener.call(this, evt);
			});
			return {
				remove: function(){
					keydownSignal.remove();
					keypressSignal.remove();
				}
			};
		};
	}else{
		if(has("opera")){
			keypress = function(object, listener){
				return on(object, "keypress", function(evt){
					var c = evt.which;
					if(c==3){
						c=99; // Mozilla maps CTRL-BREAK to CTRL-c
					}
					// can't trap some keys at all, like INSERT and DELETE
					// there is no differentiating info between DELETE and ".", or INSERT and "-"
					c = c<32 && !evt.shiftKey ? 0 : c;
					if(evt.ctrlKey && !evt.shiftKey && c>=65 && c<=90){
						// lowercase CTRL-[A-Z] keys
						c += 32;
					}
					return listener.call(this, _synthesizeEvent(evt, { charCode: c }));
				});
			};
		}else{
			keypress = function(object, listener){
				return on(object, "keypress", function(evt){
					setKeyChar(evt);
					return listener.call(this, evt);
				});
			};
		}
	}
	
	var connect = {
		// summary:
		//		This module defines the dojo.connect API.
		//		This modules also provides keyboard event handling helpers.
		//		This module exports an extension event for emulating Firefox's keypress handling.
		//		However, this extension event exists primarily for backwards compatibility and
		//		is not recommended. WebKit and IE uses an alternate keypress handling (only
		//		firing for printable characters, to distinguish from keydown events), and most
		//		consider the WebKit/IE behavior more desirable.
	
		_keypress:keypress,
	
		connect:function(obj, event, context, method, dontFix){
			// summary:
			//		`dojo.connect` is a deprecated event handling and delegation method in
			//		Dojo. It allows one function to "listen in" on the execution of
			//		any other, triggering the second whenever the first is called. Many
			//		listeners may be attached to a function, and source functions may
			//		be either regular function calls or DOM events.
			//
			// description:
			//		Connects listeners to actions, so that after event fires, a
			//		listener is called with the same arguments passed to the original
			//		function.
			//
			//		Since `dojo.connect` allows the source of events to be either a
			//		"regular" JavaScript function or a DOM event, it provides a uniform
			//		interface for listening to all the types of events that an
			//		application is likely to deal with though a single, unified
			//		interface. DOM programmers may want to think of it as
			//		"addEventListener for everything and anything".
			//
			//		When setting up a connection, the `event` parameter must be a
			//		string that is the name of the method/event to be listened for. If
			//		`obj` is null, `kernel.global` is assumed, meaning that connections
			//		to global methods are supported but also that you may inadvertently
			//		connect to a global by passing an incorrect object name or invalid
			//		reference.
			//
			//		`dojo.connect` generally is forgiving. If you pass the name of a
			//		function or method that does not yet exist on `obj`, connect will
			//		not fail, but will instead set up a stub method. Similarly, null
			//		arguments may simply be omitted such that fewer than 4 arguments
			//		may be required to set up a connection See the examples for details.
			//
			//		The return value is a handle that is needed to
			//		remove this connection with `dojo.disconnect`.
			//
			// obj: Object?
			//		The source object for the event function.
			//		Defaults to `kernel.global` if null.
			//		If obj is a DOM node, the connection is delegated
			//		to the DOM event manager (unless dontFix is true).
			//
			// event: String
			//		String name of the event function in obj.
			//		I.e. identifies a property `obj[event]`.
			//
			// context: Object|null
			//		The object that method will receive as "this".
			//
			//		If context is null and method is a function, then method
			//		inherits the context of event.
			//
			//		If method is a string then context must be the source
			//		object object for method (context[method]). If context is null,
			//		kernel.global is used.
			//
			// method: String|Function
			//		A function reference, or name of a function in context.
			//		The function identified by method fires after event does.
			//		method receives the same arguments as the event.
			//		See context argument comments for information on method's scope.
			//
			// dontFix: Boolean?
			//		If obj is a DOM node, set dontFix to true to prevent delegation
			//		of this connection to the DOM event manager.
			//
			// example:
			//		When obj.onchange(), do ui.update():
			//	|	dojo.connect(obj, "onchange", ui, "update");
			//	|	dojo.connect(obj, "onchange", ui, ui.update); // same
			//
			// example:
			//		Using return value for disconnect:
			//	|	var link = dojo.connect(obj, "onchange", ui, "update");
			//	|	...
			//	|	dojo.disconnect(link);
			//
			// example:
			//		When onglobalevent executes, watcher.handler is invoked:
			//	|	dojo.connect(null, "onglobalevent", watcher, "handler");
			//
			// example:
			//		When ob.onCustomEvent executes, customEventHandler is invoked:
			//	|	dojo.connect(ob, "onCustomEvent", null, "customEventHandler");
			//	|	dojo.connect(ob, "onCustomEvent", "customEventHandler"); // same
			//
			// example:
			//		When ob.onCustomEvent executes, customEventHandler is invoked
			//		with the same scope (this):
			//	|	dojo.connect(ob, "onCustomEvent", null, customEventHandler);
			//	|	dojo.connect(ob, "onCustomEvent", customEventHandler); // same
			//
			// example:
			//		When globalEvent executes, globalHandler is invoked
			//		with the same scope (this):
			//	|	dojo.connect(null, "globalEvent", null, globalHandler);
			//	|	dojo.connect("globalEvent", globalHandler); // same
	
			// normalize arguments
			var a=arguments, args=[], i=0;
			// if a[0] is a String, obj was omitted
			args.push(typeof a[0] == "string" ? null : a[i++], a[i++]);
			// if the arg-after-next is a String or Function, context was NOT omitted
			var a1 = a[i+1];
			args.push(typeof a1 == "string" || typeof a1 == "function" ? a[i++] : null, a[i++]);
			// absorb any additional arguments
			for(var l=a.length; i<l; i++){	args.push(a[i]); }
			return connect_.apply(this, args);
		},
	
		disconnect:function(handle){
			// summary:
			//		Remove a link created by dojo.connect.
			// description:
			//		Removes the connection between event and the method referenced by handle.
			// handle: Handle
			//		the return value of the dojo.connect call that created the connection.
	
			if(handle){
				handle.remove();
			}
		},
	
		subscribe:function(topic, context, method){
			// summary:
			//		Attach a listener to a named topic. The listener function is invoked whenever the
			//		named topic is published (see: dojo.publish).
			//		Returns a handle which is needed to unsubscribe this listener.
			// topic: String
			//		The topic to which to subscribe.
			// context: Object?
			//		Scope in which method will be invoked, or null for default scope.
			// method: String|Function
			//		The name of a function in context, or a function reference. This is the function that
			//		is invoked when topic is published.
			// example:
			//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); });
			//	|	dojo.publish("alerts", [ "read this", "hello world" ]);
			return hub.subscribe(topic, lang.hitch(context, method));
		},
	
		publish:function(topic, args){
			// summary:
			//		Invoke all listener method subscribed to topic.
			// topic: String
			//		The name of the topic to publish.
			// args: Array?
			//		An array of arguments. The arguments will be applied
			//		to each topic subscriber (as first class parameters, via apply).
			// example:
			//	|	dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
			//	|	dojo.publish("alerts", [ "read this", "hello world" ]);
			return hub.publish.apply(hub, [topic].concat(args));
		},
	
		connectPublisher:function(topic, obj, event){
			// summary:
			//		Ensure that every time obj.event() is called, a message is published
			//		on the topic. Returns a handle which can be passed to
			//		dojo.disconnect() to disable subsequent automatic publication on
			//		the topic.
			// topic: String
			//		The name of the topic to publish.
			// obj: Object?
			//		The source object for the event function. Defaults to kernel.global
			//		if null.
			// event: String
			//		The name of the event function in obj.
			//		I.e. identifies a property obj[event].
			// example:
			//	|	dojo.connectPublisher("/ajax/start", dojo, "xhrGet");
			var pf = function(){ connect.publish(topic, arguments); };
			return event ? connect.connect(obj, event, pf) : connect.connect(obj, pf); //Handle
		},
	
		isCopyKey: function(e){
			// summary:
			//		Checks an event for the copy key (meta on Mac, and ctrl anywhere else)
			// e: Event
			//		Event object to examine
			return e[evtCopyKey];	// Boolean
		}
	};
	
	connect.unsubscribe = connect.disconnect;
	/*=====
	 connect.unsubscribe = function(handle){
		 // summary:
		 //		Remove a topic listener.
		 // handle: Handle
		 //		The handle returned from a call to subscribe.
		 // example:
		 //	|	var alerter = dojo.subscribe("alerts", null, function(caption, message){ alert(caption + "\n" + message); };
		 //	|	...
		 //	|	dojo.unsubscribe(alerter);
	 };
	 =====*/
	
	has("extend-dojo") && lang.mixin(dojo, connect);
	return connect;
	
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Evented){
	
		// module:
		//		dojo/topic
	
		var hub = new Evented;
		return {
			// summary:
			//		Pubsub hub.
			// example:
			//		| 	topic.subscribe("some/topic", function(event){
			//		|	... do something with event
			//		|	});
			//		|	topic.publish("some/topic", {name:"some event", ...});
	
			publish: function(topic, event){
				// summary:
				//		Publishes a message to a topic on the pub/sub hub. All arguments after
				//		the first will be passed to the subscribers, so any number of arguments
				//		can be provided (not just event).
				// topic: String
				//		The name of the topic to publish to
				// event: Object
				//		An event to distribute to the topic listeners
				return hub.emit.apply(hub, arguments);
			},
	
			subscribe: function(topic, listener){
				// summary:
				//		Subscribes to a topic on the pub/sub hub
				// topic: String
				//		The topic to subscribe to
				// listener: Function
				//		A function to call when a message is published to the given topic
				return hub.on.apply(hub, arguments);
			}
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

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(18), __webpack_require__(4), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, on, has, dom){
		// module:
		//		dojo/_base/event
	
		if(on._fixEvent){
			var fixEvent = on._fixEvent;
			on._fixEvent = function(evt, se){
				// add some additional normalization for back-compat, this isn't in on.js because it is somewhat more expensive
				evt = fixEvent(evt, se);
				if(evt){
					dom.normalizeEvent(evt);
				}
				return evt;
			};		
		}
		
		var ret = {
			// summary:
			//		This module defines dojo DOM event API.   Usually you should use dojo/on, and evt.stopPropagation() +
			//		evt.preventDefault(), rather than this module.
	
			fix: function(/*Event*/ evt, /*DOMNode*/ sender){
				// summary:
				//		normalizes properties on the event object including event
				//		bubbling methods, keystroke normalization, and x/y positions
				// evt: Event
				//		native event object
				// sender: DOMNode
				//		node to treat as "currentTarget"
				if(on._fixEvent){
					return on._fixEvent(evt, sender);
				}
				return evt;	// Event
			},
		
			stop: function(/*Event*/ evt){
				// summary:
				//		prevents propagation and clobbers the default action of the
				//		passed event
				// evt: Event
				//		The event object. If omitted, window.event is used on IE.
				if(has("dom-addeventlistener") || (evt && evt.preventDefault)){
					evt.preventDefault();
					evt.stopPropagation();
				}else{
					evt = evt || window.event;
					evt.cancelBubble = true;
					on._preventDefault.call(evt);
				}
			}
		};
	
		if(has("extend-dojo")){
			dojo.fixEvent = ret.fix;
			dojo.stopEvent = ret.stop;
		}
	
		return ret;
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

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(18), __webpack_require__(4), __webpack_require__(13), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, on, has, dom, win){
	
		// module:
		//		dojo/mouse
	
	    has.add("dom-quirks", win.doc && win.doc.compatMode == "BackCompat");
		has.add("events-mouseenter", win.doc && "onmouseenter" in win.doc.createElement("div"));
		has.add("events-mousewheel", win.doc && 'onmousewheel' in win.doc);
	
		var mouseButtons;
		if((has("dom-quirks") && has("ie")) || !has("dom-addeventlistener")){
			mouseButtons = {
				LEFT:   1,
				MIDDLE: 4,
				RIGHT:  2,
				// helper functions
				isButton: function(e, button){ return e.button & button; },
				isLeft:   function(e){ return e.button & 1; },
				isMiddle: function(e){ return e.button & 4; },
				isRight:  function(e){ return e.button & 2; }
			};
		}else{
			mouseButtons = {
				LEFT:   0,
				MIDDLE: 1,
				RIGHT:  2,
				// helper functions
				isButton: function(e, button){ return e.button == button; },
				isLeft:   function(e){ return e.button == 0; },
				isMiddle: function(e){ return e.button == 1; },
				isRight:  function(e){ return e.button == 2; }
			};
		}
		dojo.mouseButtons = mouseButtons;
	
	/*=====
		dojo.mouseButtons = {
			// LEFT: Number
			//		Numeric value of the left mouse button for the platform.
			LEFT:   0,
			// MIDDLE: Number
			//		Numeric value of the middle mouse button for the platform.
			MIDDLE: 1,
			// RIGHT: Number
			//		Numeric value of the right mouse button for the platform.
			RIGHT:  2,
	
			isButton: function(e, button){
				// summary:
				//		Checks an event object for a pressed button
				// e: Event
				//		Event object to examine
				// button: Number
				//		The button value (example: dojo.mouseButton.LEFT)
				return e.button == button; // Boolean
			},
			isLeft: function(e){
				// summary:
				//		Checks an event object for the pressed left button
				// e: Event
				//		Event object to examine
				return e.button == 0; // Boolean
			},
			isMiddle: function(e){
				// summary:
				//		Checks an event object for the pressed middle button
				// e: Event
				//		Event object to examine
				return e.button == 1; // Boolean
			},
			isRight: function(e){
				// summary:
				//		Checks an event object for the pressed right button
				// e: Event
				//		Event object to examine
				return e.button == 2; // Boolean
			}
		};
	=====*/
	
		function eventHandler(type, selectHandler){
			// emulation of mouseenter/leave with mouseover/out using descendant checking
			var handler = function(node, listener){
				return on(node, type, function(evt){
					if(selectHandler){
						return selectHandler(evt, listener);
					}
					if(!dom.isDescendant(evt.relatedTarget, node)){
						return listener.call(this, evt);
					}
				});
			};
			handler.bubble = function(select){
				return eventHandler(type, function(evt, listener){
					// using a selector, use the select function to determine if the mouse moved inside the selector and was previously outside the selector
					var target = select(evt.target);
					var relatedTarget = evt.relatedTarget;
					if(target && (target != (relatedTarget && relatedTarget.nodeType == 1 && select(relatedTarget)))){
						return listener.call(target, evt);
					} 
				});
			};
			return handler;
		}
		var wheel;
		if(has("events-mousewheel")){
			wheel = 'mousewheel';
		}else{ //firefox
			wheel = function(node, listener){
				return on(node, 'DOMMouseScroll', function(evt){
					evt.wheelDelta = -evt.detail;
					listener.call(this, evt);
				});
			};
		}
		return {
			// summary:
			//		This module provide mouse event handling utility functions and exports
			//		mouseenter and mouseleave event emulation.
			// example:
			//		To use these events, you register a mouseenter like this:
			//		|	define(["dojo/on", "dojo/mouse"], function(on, mouse){
			//		|		on(targetNode, mouse.enter, function(event){
			//		|			dojo.addClass(targetNode, "highlighted");
			//		|		});
			//		|		on(targetNode, mouse.leave, function(event){
			//		|			dojo.removeClass(targetNode, "highlighted");
			//		|		});
	
			_eventHandler: eventHandler,		// for dojo/touch
	
			// enter: Synthetic Event
			//		This is an extension event for the mouseenter that IE provides, emulating the
			//		behavior on other browsers.
			enter: eventHandler("mouseover"),
	
			// leave: Synthetic Event
			//		This is an extension event for the mouseleave that IE provides, emulating the
			//		behavior on other browsers.
			leave: eventHandler("mouseout"),
	
			// wheel: Normalized Mouse Wheel Event
			//		This is an extension event for the mousewheel that non-Mozilla browsers provide,
			//		emulating the behavior on Mozilla based browsers.
			wheel: wheel,
	
			isLeft: mouseButtons.isLeft,
			/*=====
			isLeft: function(){
				// summary:
				//		Test an event object (from a mousedown event) to see if the left button was pressed.
			},
			=====*/
	
			isMiddle: mouseButtons.isMiddle,
			/*=====
			 isMiddle: function(){
				 // summary:
				 //		Test an event object (from a mousedown event) to see if the middle button was pressed.
			 },
			 =====*/
	
			isRight: mouseButtons.isRight
			/*=====
			 , isRight: function(){
				 // summary:
				 //		Test an event object (from a mousedown event) to see if the right button was pressed.
			 }
			 =====*/
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, lang, has){
		// module:
		//		dojo/_base/sniff
	
		/*=====
		return {
			// summary:
			//		Deprecated.   New code should use dojo/sniff.
			//		This module populates the dojo browser version sniffing properties like dojo.isIE.
		};
		=====*/
	
		if(!has("host-browser")){
			return has;
		}
	
		// no idea what this is for, or if it's used
		dojo._name = "browser";
	
		lang.mixin(dojo, {
			// isBrowser: Boolean
			//		True if the client is a web-browser
			isBrowser: true,
	
			// isFF: Number|undefined
			//		Version as a Number if client is FireFox. undefined otherwise. Corresponds to
			//		major detected FireFox version (1.5, 2, 3, etc.)
			isFF: has("ff"),
	
			// isIE: Number|undefined
			//		Version as a Number if client is MSIE(PC). undefined otherwise. Corresponds to
			//		major detected IE version (6, 7, 8, etc.)
			isIE: has("ie"),
	
			// isKhtml: Number|undefined
			//		Version as a Number if client is a KHTML browser. undefined otherwise. Corresponds to major
			//		detected version.
			isKhtml: has("khtml"),
	
			// isWebKit: Number|undefined
			//		Version as a Number if client is a WebKit-derived browser (Konqueror,
			//		Safari, Chrome, etc.). undefined otherwise.
			isWebKit: has("webkit"),
	
			// isMozilla: Number|undefined
			//		Version as a Number if client is a Mozilla-based browser (Firefox,
			//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
			isMozilla: has("mozilla"),
			// isMoz: Number|undefined
			//		Version as a Number if client is a Mozilla-based browser (Firefox,
			//		SeaMonkey). undefined otherwise. Corresponds to major detected version.
			isMoz: has("mozilla"),
	
			// isOpera: Number|undefined
			//		Version as a Number if client is Opera. undefined otherwise. Corresponds to
			//		major detected version.
			isOpera: has("opera"),
	
			// isSafari: Number|undefined
			//		Version as a Number if client is Safari or iPhone. undefined otherwise.
			isSafari: has("safari"),
	
			// isChrome: Number|undefined
			//		Version as a Number if client is Chrome browser. undefined otherwise.
			isChrome: has("chrome"),
	
			// isMac: Boolean
			//		True if the client runs on Mac
			isMac: has("mac"),
	
			// isIos: Number|undefined
			//		Version as a Number if client is iPhone, iPod, or iPad. undefined otherwise.
			isIos: has("ios"),
	
			// isAndroid: Number|undefined
			//		Version as a Number if client is android browser. undefined otherwise.
			isAndroid: has("android"),
	
			// isWii: Boolean
			//		True if client is Wii
			isWii: has("wii"),
	
			// isQuirks: Boolean
			//		Page is in quirks mode.
			isQuirks: has("quirks"),
	
			// isAir: Boolean
			//		True if client is Adobe Air
			isAir: has("air")
		});
	
		return has;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has){
	
		// module:
		//		dojo/keys
	
		return dojo.keys = {
			// summary:
			//		Definitions for common key values.  Client code should test keyCode against these named constants,
			//		as the actual codes can vary by browser.
	
			BACKSPACE: 8,
			TAB: 9,
			CLEAR: 12,
			ENTER: 13,
			SHIFT: 16,
			CTRL: 17,
			ALT: 18,
			META: has("webkit") ? 91 : 224,		// the apple key on macs
			PAUSE: 19,
			CAPS_LOCK: 20,
			ESCAPE: 27,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT_ARROW: 37,
			UP_ARROW: 38,
			RIGHT_ARROW: 39,
			DOWN_ARROW: 40,
			INSERT: 45,
			DELETE: 46,
			HELP: 47,
			LEFT_WINDOW: 91,
			RIGHT_WINDOW: 92,
			SELECT: 93,
			NUMPAD_0: 96,
			NUMPAD_1: 97,
			NUMPAD_2: 98,
			NUMPAD_3: 99,
			NUMPAD_4: 100,
			NUMPAD_5: 101,
			NUMPAD_6: 102,
			NUMPAD_7: 103,
			NUMPAD_8: 104,
			NUMPAD_9: 105,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_PLUS: 107,
			NUMPAD_ENTER: 108,
			NUMPAD_MINUS: 109,
			NUMPAD_PERIOD: 110,
			NUMPAD_DIVIDE: 111,
			F1: 112,
			F2: 113,
			F3: 114,
			F4: 115,
			F5: 116,
			F6: 117,
			F7: 118,
			F8: 119,
			F9: 120,
			F10: 121,
			F11: 122,
			F12: 123,
			F13: 124,
			F14: 125,
			F15: 126,
			NUM_LOCK: 144,
			SCROLL_LOCK: 145,
			UP_DPAD: 175,
			DOWN_DPAD: 176,
			LEFT_DPAD: 177,
			RIGHT_DPAD: 178,
			// virtual key mapping
			copyKey: has("mac") && !has("air") ? (has("safari") ? 91 : 224 ) : 17
		};
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

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(13), __webpack_require__(18), __webpack_require__(28), __webpack_require__(8), __webpack_require__(35), __webpack_require__(36)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has, dom, on, array, lang, loader, defaultEngine){
	
		"use strict";
	
		has.add("array-extensible", function(){
			// test to see if we can extend an array (not supported in old IE)
			return lang.delegate([], {length: 1}).length == 1 && !has("bug-for-in-skips-shadowed");
		});
		
		var ap = Array.prototype, aps = ap.slice, apc = ap.concat, forEach = array.forEach;
	
		var tnl = function(/*Array*/ a, /*dojo/NodeList?*/ parent, /*Function?*/ NodeListCtor){
			// summary:
			//		decorate an array to make it look like a `dojo/NodeList`.
			// a:
			//		Array of nodes to decorate.
			// parent:
			//		An optional parent NodeList that generated the current
			//		list of nodes. Used to call _stash() so the parent NodeList
			//		can be accessed via end() later.
			// NodeListCtor:
			//		An optional constructor function to use for any
			//		new NodeList calls. This allows a certain chain of
			//		NodeList calls to use a different object than dojo/NodeList.
			var nodeList = new (NodeListCtor || this._NodeListCtor || nl)(a);
			return parent ? nodeList._stash(parent) : nodeList;
		};
	
		var loopBody = function(f, a, o){
			a = [0].concat(aps.call(a, 0));
			o = o || dojo.global;
			return function(node){
				a[0] = node;
				return f.apply(o, a);
			};
		};
	
		// adapters
	
		var adaptAsForEach = function(f, o){
			// summary:
			//		adapts a single node function to be used in the forEach-type
			//		actions. The initial object is returned from the specialized
			//		function.
			// f: Function
			//		a function to adapt
			// o: Object?
			//		an optional context for f
			return function(){
				this.forEach(loopBody(f, arguments, o));
				return this;	// Object
			};
		};
	
		var adaptAsMap = function(f, o){
			// summary:
			//		adapts a single node function to be used in the map-type
			//		actions. The return is a new array of values, as via `dojo/_base/array.map`
			// f: Function
			//		a function to adapt
			// o: Object?
			//		an optional context for f
			return function(){
				return this.map(loopBody(f, arguments, o));
			};
		};
	
		var adaptAsFilter = function(f, o){
			// summary:
			//		adapts a single node function to be used in the filter-type actions
			// f: Function
			//		a function to adapt
			// o: Object?
			//		an optional context for f
			return function(){
				return this.filter(loopBody(f, arguments, o));
			};
		};
	
		var adaptWithCondition = function(f, g, o){
			// summary:
			//		adapts a single node function to be used in the map-type
			//		actions, behaves like forEach() or map() depending on arguments
			// f: Function
			//		a function to adapt
			// g: Function
			//		a condition function, if true runs as map(), otherwise runs as forEach()
			// o: Object?
			//		an optional context for f and g
			return function(){
				var a = arguments, body = loopBody(f, a, o);
				if(g.call(o || dojo.global, a)){
					return this.map(body);	// self
				}
				this.forEach(body);
				return this;	// self
			};
		};
	
		var NodeList = function(array){
			// summary:
			//		Array-like object which adds syntactic
			//		sugar for chaining, common iteration operations, animation, and
			//		node manipulation. NodeLists are most often returned as the
			//		result of dojo/query() calls.
			// description:
			//		NodeList instances provide many utilities that reflect
			//		core Dojo APIs for Array iteration and manipulation, DOM
			//		manipulation, and event handling. Instead of needing to dig up
			//		functions in the dojo package, NodeLists generally make the
			//		full power of Dojo available for DOM manipulation tasks in a
			//		simple, chainable way.
			// example:
			//		create a node list from a node
			//		|	require(["dojo/query", "dojo/dom"
			//		|	], function(query, dom){
			//		|		query.NodeList(dom.byId("foo"));
			//		|	});
			// example:
			//		get a NodeList from a CSS query and iterate on it
			//		|	require(["dojo/on", "dojo/dom"
			//		|	], function(on, dom){
			//		|		var l = query(".thinger");
			//		|		l.forEach(function(node, index, nodeList){
			//		|			console.log(index, node.innerHTML);
			//		|		});
			//		|	});
			// example:
			//		use native and Dojo-provided array methods to manipulate a
			//		NodeList without needing to use dojo.* functions explicitly:
			//		|	require(["dojo/query", "dojo/dom-construct", "dojo/dom"
			//		|	], function(query, domConstruct, dom){
			//		|		var l = query(".thinger");
			//		|		// since NodeLists are real arrays, they have a length
			//		|		// property that is both readable and writable and
			//		|		// push/pop/shift/unshift methods
			//		|		console.log(l.length);
			//		|		l.push(domConstruct.create("span"));
			//		|
			//		|		// dojo's normalized array methods work too:
			//		|		console.log( l.indexOf(dom.byId("foo")) );
			//		|		// ...including the special "function as string" shorthand
			//		|		console.log( l.every("item.nodeType == 1") );
			//		|
			//		|		// NodeLists can be [..] indexed, or you can use the at()
			//		|		// function to get specific items wrapped in a new NodeList:
			//		|		var node = l[3]; // the 4th element
			//		|		var newList = l.at(1, 3); // the 2nd and 4th elements
			//		|	});
			// example:
			//		chainability is a key advantage of NodeLists:
			//		|	require(["dojo/query", "dojo/NodeList-dom"
			//		|	], function(query){
			//		|		query(".thinger")
			//		|			.onclick(function(e){ /* ... */ })
			//		|			.at(1, 3, 8) // get a subset
			//		|				.style("padding", "5px")
			//		|				.forEach(console.log);
			//		|	});
	
			var isNew = this instanceof nl && has("array-extensible");
			if(typeof array == "number"){
				array = Array(array);
			}
			var nodeArray = (array && "length" in array) ? array : arguments;
			if(isNew || !nodeArray.sort){
				// make sure it's a real array before we pass it on to be wrapped 
				var target = isNew ? this : [],
					l = target.length = nodeArray.length;
				for(var i = 0; i < l; i++){
					target[i] = nodeArray[i];
				}
				if(isNew){
					// called with new operator, this means we are going to use this instance and push
					// the nodes on to it. This is usually much faster since the NodeList properties
					//	don't need to be copied (unless the list of nodes is extremely large).
					return target;
				}
				nodeArray = target;
			}
			// called without new operator, use a real array and copy prototype properties,
			// this is slower and exists for back-compat. Should be removed in 2.0.
			lang._mixin(nodeArray, nlp);
			nodeArray._NodeListCtor = function(array){
				// call without new operator to preserve back-compat behavior
				return nl(array);
			};
			return nodeArray;
		};
		
		var nl = NodeList, nlp = nl.prototype = 
			has("array-extensible") ? [] : {};// extend an array if it is extensible
	
		// expose adapters and the wrapper as private functions
	
		nl._wrap = nlp._wrap = tnl;
		nl._adaptAsMap = adaptAsMap;
		nl._adaptAsForEach = adaptAsForEach;
		nl._adaptAsFilter  = adaptAsFilter;
		nl._adaptWithCondition = adaptWithCondition;
	
		// mass assignment
	
		// add array redirectors
		forEach(["slice", "splice"], function(name){
			var f = ap[name];
			//Use a copy of the this array via this.slice() to allow .end() to work right in the splice case.
			// CANNOT apply ._stash()/end() to splice since it currently modifies
			// the existing this array -- it would break backward compatibility if we copy the array before
			// the splice so that we can use .end(). So only doing the stash option to this._wrap for slice.
			nlp[name] = function(){ return this._wrap(f.apply(this, arguments), name == "slice" ? this : null); };
		});
		// concat should be here but some browsers with native NodeList have problems with it
	
		// add array.js redirectors
		forEach(["indexOf", "lastIndexOf", "every", "some"], function(name){
			var f = array[name];
			nlp[name] = function(){ return f.apply(dojo, [this].concat(aps.call(arguments, 0))); };
		});
	
		lang.extend(NodeList, {
			// copy the constructors
			constructor: nl,
			_NodeListCtor: nl,
			toString: function(){
				// Array.prototype.toString can't be applied to objects, so we use join
				return this.join(",");
			},
			_stash: function(parent){
				// summary:
				//		private function to hold to a parent NodeList. end() to return the parent NodeList.
				//
				// example:
				//		How to make a `dojo/NodeList` method that only returns the third node in
				//		the dojo/NodeList but allows access to the original NodeList by using this._stash:
				//	|	require(["dojo/query", "dojo/_base/lang", "dojo/NodeList", "dojo/NodeList-dom"
				//	|	], function(query, lang){
				//	|		lang.extend(NodeList, {
				//	|			third: function(){
				//	|				var newNodeList = NodeList(this[2]);
				//	|				return newNodeList._stash(this);
				//	|			}
				//	|		});
				//	|		// then see how _stash applies a sub-list, to be .end()'ed out of
				//	|		query(".foo")
				//	|			.third()
				//	|				.addClass("thirdFoo")
				//	|			.end()
				//	|			// access to the orig .foo list
				//	|			.removeClass("foo")
				//	|	});
				//
				this._parent = parent;
				return this; // dojo/NodeList
			},
	
			on: function(eventName, listener){
				// summary:
				//		Listen for events on the nodes in the NodeList. Basic usage is:
				//
				// example:
				//		|	require(["dojo/query"
				//		|	], function(query){
				//		|		query(".my-class").on("click", listener);
				//			This supports event delegation by using selectors as the first argument with the event names as
				//			pseudo selectors. For example:
				//		| 		query("#my-list").on("li:click", listener);
				//			This will listen for click events within `<li>` elements that are inside the `#my-list` element.
				//			Because on supports CSS selector syntax, we can use comma-delimited events as well:
				//		| 		query("#my-list").on("li button:mouseover, li:click", listener);
				//		|	});
				var handles = this.map(function(node){
					return on(node, eventName, listener); // TODO: apply to the NodeList so the same selector engine is used for matches
				});
				handles.remove = function(){
					for(var i = 0; i < handles.length; i++){
						handles[i].remove();
					}
				};
				return handles;
			},
	
			end: function(){
				// summary:
				//		Ends use of the current `NodeList` by returning the previous NodeList
				//		that generated the current NodeList.
				// description:
				//		Returns the `NodeList` that generated the current `NodeList`. If there
				//		is no parent NodeList, an empty NodeList is returned.
				// example:
				//	|	require(["dojo/query", "dojo/NodeList-dom"
				//	|	], function(query){
				//	|		query("a")
				//	|			.filter(".disabled")
				//	|				// operate on the anchors that only have a disabled class
				//	|				.style("color", "grey")
				//	|			.end()
				//	|			// jump back to the list of anchors
				//	|			.style(...)
				//	|	});
				//
				if(this._parent){
					return this._parent;
				}else{
					//Just return empty list.
					return new this._NodeListCtor(0);
				}
			},
	
			// http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Global_Objects:Array#Methods
	
			// FIXME: handle return values for #3244
			//		http://trac.dojotoolkit.org/ticket/3244
	
			// FIXME:
			//		need to wrap or implement:
			//			join (perhaps w/ innerHTML/outerHTML overload for toString() of items?)
			//			reduce
			//			reduceRight
	
			/*=====
			slice: function(begin, end){
				// summary:
				//		Returns a new NodeList, maintaining this one in place
				// description:
				//		This method behaves exactly like the Array.slice method
				//		with the caveat that it returns a `dojo/NodeList` and not a
				//		raw Array. For more details, see Mozilla's [slice
				//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/slice)
				// begin: Integer
				//		Can be a positive or negative integer, with positive
				//		integers noting the offset to begin at, and negative
				//		integers denoting an offset from the end (i.e., to the left
				//		of the end)
				// end: Integer?
				//		Optional parameter to describe what position relative to
				//		the NodeList's zero index to end the slice at. Like begin,
				//		can be positive or negative.
				return this._wrap(a.slice.apply(this, arguments));
			},
	
			splice: function(index, howmany, item){
				// summary:
				//		Returns a new NodeList, manipulating this NodeList based on
				//		the arguments passed, potentially splicing in new elements
				//		at an offset, optionally deleting elements
				// description:
				//		This method behaves exactly like the Array.splice method
				//		with the caveat that it returns a `dojo/NodeList` and not a
				//		raw Array. For more details, see Mozilla's [splice
				//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)
				//		For backwards compatibility, calling .end() on the spliced NodeList
				//		does not return the original NodeList -- splice alters the NodeList in place.
				// index: Integer
				//		begin can be a positive or negative integer, with positive
				//		integers noting the offset to begin at, and negative
				//		integers denoting an offset from the end (i.e., to the left
				//		of the end)
				// howmany: Integer?
				//		Optional parameter to describe what position relative to
				//		the NodeList's zero index to end the slice at. Like begin,
				//		can be positive or negative.
				// item: Object...?
				//		Any number of optional parameters may be passed in to be
				//		spliced into the NodeList
				return this._wrap(a.splice.apply(this, arguments));	// dojo/NodeList
			},
	
			indexOf: function(value, fromIndex){
				// summary:
				//		see `dojo/_base/array.indexOf()`. The primary difference is that the acted-on
				//		array is implicitly this NodeList
				// value: Object
				//		The value to search for.
				// fromIndex: Integer?
				//		The location to start searching from. Optional. Defaults to 0.
				// description:
				//		For more details on the behavior of indexOf, see Mozilla's
				//		[indexOf
				//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf)
				// returns:
				//		Positive Integer or 0 for a match, -1 of not found.
				return d.indexOf(this, value, fromIndex); // Integer
			},
	
			lastIndexOf: function(value, fromIndex){
				// summary:
				//		see `dojo/_base/array.lastIndexOf()`. The primary difference is that the
				//		acted-on array is implicitly this NodeList
				// description:
				//		For more details on the behavior of lastIndexOf, see
				//		Mozilla's [lastIndexOf
				//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
				// value: Object
				//		The value to search for.
				// fromIndex: Integer?
				//		The location to start searching from. Optional. Defaults to 0.
				// returns:
				//		Positive Integer or 0 for a match, -1 of not found.
				return d.lastIndexOf(this, value, fromIndex); // Integer
			},
	
			every: function(callback, thisObject){
				// summary:
				//		see `dojo/_base/array.every()` and the [Array.every
				//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every).
				//		Takes the same structure of arguments and returns as
				//		dojo/_base/array.every() with the caveat that the passed array is
				//		implicitly this NodeList
				// callback: Function
				//		the callback
				// thisObject: Object?
				//		the context
				return d.every(this, callback, thisObject); // Boolean
			},
	
			some: function(callback, thisObject){
				// summary:
				//		Takes the same structure of arguments and returns as
				//		`dojo/_base/array.some()` with the caveat that the passed array is
				//		implicitly this NodeList.  See `dojo/_base/array.some()` and Mozilla's
				//		[Array.some
				//		documentation](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some).
				// callback: Function
				//		the callback
				// thisObject: Object?
				//		the context
				return d.some(this, callback, thisObject); // Boolean
			},
			=====*/
	
			concat: function(item){
				// summary:
				//		Returns a new NodeList comprised of items in this NodeList
				//		as well as items passed in as parameters
				// description:
				//		This method behaves exactly like the Array.concat method
				//		with the caveat that it returns a `NodeList` and not a
				//		raw Array. For more details, see the [Array.concat
				//		docs](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/concat)
				// item: Object?
				//		Any number of optional parameters may be passed in to be
				//		spliced into the NodeList
	
				//return this._wrap(apc.apply(this, arguments));
				// the line above won't work for the native NodeList, or for Dojo NodeLists either :-(
	
				// implementation notes:
				// Array.concat() doesn't recognize native NodeLists or Dojo NodeLists
				// as arrays, and so does not inline them into a unioned array, but
				// appends them as single entities. Both the original NodeList and the
				// items passed in as parameters must be converted to raw Arrays
				// and then the concatenation result may be re-_wrap()ed as a Dojo NodeList.
	
				var t = aps.call(this, 0),
					m = array.map(arguments, function(a){
						return aps.call(a, 0);
					});
				return this._wrap(apc.apply(t, m), this);	// dojo/NodeList
			},
	
			map: function(/*Function*/ func, /*Function?*/ obj){
				// summary:
				//		see `dojo/_base/array.map()`. The primary difference is that the acted-on
				//		array is implicitly this NodeList and the return is a
				//		NodeList (a subclass of Array)
				return this._wrap(array.map(this, func, obj), this); // dojo/NodeList
			},
	
			forEach: function(callback, thisObj){
				// summary:
				//		see `dojo/_base/array.forEach()`. The primary difference is that the acted-on
				//		array is implicitly this NodeList. If you want the option to break out
				//		of the forEach loop, use every() or some() instead.
				forEach(this, callback, thisObj);
				// non-standard return to allow easier chaining
				return this; // dojo/NodeList
			},
			filter: function(/*String|Function*/ filter){
				// summary:
				//		"masks" the built-in javascript filter() method (supported
				//		in Dojo via `dojo/_base/array.filter`) to support passing a simple
				//		string filter in addition to supporting filtering function
				//		objects.
				// filter:
				//		If a string, a CSS rule like ".thinger" or "div > span".
				// example:
				//		"regular" JS filter syntax as exposed in `dojo/_base/array.filter`:
				//		|	require(["dojo/query", "dojo/NodeList-dom"
				//		|	], function(query){
				//		|		query("*").filter(function(item){
				//		|			// highlight every paragraph
				//		|			return (item.nodeName == "p");
				//		|		}).style("backgroundColor", "yellow");
				//		|	});
				// example:
				//		the same filtering using a CSS selector
				//		|	require(["dojo/query", "dojo/NodeList-dom"
				//		|	], function(query){
				//		|		query("*").filter("p").styles("backgroundColor", "yellow");
				//		|	});
	
				var a = arguments, items = this, start = 0;
				if(typeof filter == "string"){ // inline'd type check
					items = query._filterResult(this, a[0]);
					if(a.length == 1){
						// if we only got a string query, pass back the filtered results
						return items._stash(this); // dojo/NodeList
					}
					// if we got a callback, run it over the filtered items
					start = 1;
				}
				return this._wrap(array.filter(items, a[start], a[start + 1]), this);	// dojo/NodeList
			},
			instantiate: function(/*String|Object*/ declaredClass, /*Object?*/ properties){
				// summary:
				//		Create a new instance of a specified class, using the
				//		specified properties and each node in the NodeList as a
				//		srcNodeRef.
				// example:
				//		Grabs all buttons in the page and converts them to dijit/form/Button's.
				//	|	var buttons = query("button").instantiate(Button, {showLabel: true});
				var c = lang.isFunction(declaredClass) ? declaredClass : lang.getObject(declaredClass);
				properties = properties || {};
				return this.forEach(function(node){
					new c(properties, node);
				});	// dojo/NodeList
			},
			at: function(/*===== index =====*/){
				// summary:
				//		Returns a new NodeList comprised of items in this NodeList
				//		at the given index or indices.
				//
				// index: Integer...
				//		One or more 0-based indices of items in the current
				//		NodeList. A negative index will start at the end of the
				//		list and go backwards.
				//
				// example:
				//	Shorten the list to the first, second, and third elements
				//	|	require(["dojo/query"
				//	|	], function(query){
				//	|		query("a").at(0, 1, 2).forEach(fn);
				//	|	});
				//
				// example:
				//	Retrieve the first and last elements of a unordered list:
				//	|	require(["dojo/query"
				//	|	], function(query){
				//	|		query("ul > li").at(0, -1).forEach(cb);
				//	|	});
				//
				// example:
				//	Do something for the first element only, but end() out back to
				//	the original list and continue chaining:
				//	|	require(["dojo/query"
				//	|	], function(query){
				//	|		query("a").at(0).onclick(fn).end().forEach(function(n){
				//	|			console.log(n); // all anchors on the page.
				//	|	})
				//	|	});
	
				var t = new this._NodeListCtor(0);
				forEach(arguments, function(i){
					if(i < 0){ i = this.length + i; }
					if(this[i]){ t.push(this[i]); }
				}, this);
				return t._stash(this); // dojo/NodeList
			}
		});
	
		function queryForEngine(engine, NodeList){
			var query = function(/*String*/ query, /*String|DOMNode?*/ root){
				// summary:
				//		Returns nodes which match the given CSS selector, searching the
				//		entire document by default but optionally taking a node to scope
				//		the search by. Returns an instance of NodeList.
				if(typeof root == "string"){
					root = dom.byId(root);
					if(!root){
						return new NodeList([]);
					}
				}
				var results = typeof query == "string" ? engine(query, root) : query ? (query.end && query.on) ? query : [query] : [];
				if(results.end && results.on){
					// already wrapped
					return results;
				}
				return new NodeList(results);
			};
			query.matches = engine.match || function(node, selector, root){
				// summary:
				//		Test to see if a node matches a selector
				return query.filter([node], selector, root).length > 0;
			};
			// the engine provides a filtering function, use it to for matching
			query.filter = engine.filter || function(nodes, selector, root){
				// summary:
				//		Filters an array of nodes. Note that this does not guarantee to return a NodeList, just an array.
				return query(selector, root).filter(function(node){
					return array.indexOf(nodes, node) > -1;
				});
			};
			if(typeof engine != "function"){
				var search = engine.search;
				engine = function(selector, root){
					// Slick does it backwards (or everyone else does it backwards, probably the latter)
					return search(root || document, selector);
				};
			}
			return query;
		}
		var query = queryForEngine(defaultEngine, NodeList);
		/*=====
		query = function(selector, context){
			// summary:
			//		This modules provides DOM querying functionality. The module export is a function
			//		that can be used to query for DOM nodes by CSS selector and returns a NodeList
			//		representing the matching nodes.
			// selector: String
			//		A CSS selector to search for.
			// context: String|DomNode?
			//		An optional context to limit the searching scope. Only nodes under `context` will be
			//		scanned.
			// example:
			//		add an onclick handler to every submit button in the document
			//		which causes the form to be sent via Ajax instead:
			//	|	require(["dojo/query", "dojo/request", "dojo/dom-form", "dojo/dom-construct", "dojo/dom-style"
			//	|	], function(query, request, domForm, domConstruct, domStyle){
			//	|		query("input[type='submit']").on("click", function(e){
			//	|			e.preventDefault(); // prevent sending the form
			//	|			var btn = e.target;
			//	|			request.post("http://example.com/", {
			//	|				data: domForm.toObject(btn.form)
			//	|			}).then(function(response){
			//	|				// replace the form with the response
			//	|				domConstruct.create(div, {innerHTML: response}, btn.form, "after");
			//	|				domStyle.set(btn.form, "display", "none");
			//	|			});
			//	|		});
			//	|	});
			//
			// description:
			//		dojo/query is responsible for loading the appropriate query engine and wrapping
			//		its results with a `NodeList`. You can use dojo/query with a specific selector engine
			//		by using it as a plugin. For example, if you installed the sizzle package, you could
			//		use it as the selector engine with:
			//		|	require(["dojo/query!sizzle"], function(query){
			//		|		query("div")...
			//
			//		The id after the ! can be a module id of the selector engine or one of the following values:
			//
			//		- acme: This is the default engine used by Dojo base, and will ensure that the full
			//		Acme engine is always loaded.
			//
			//		- css2: If the browser has a native selector engine, this will be used, otherwise a
			//		very minimal lightweight selector engine will be loaded that can do simple CSS2 selectors
			//		(by #id, .class, tag, and [name=value] attributes, with standard child or descendant (>)
			//		operators) and nothing more.
			//
			//		- css2.1: If the browser has a native selector engine, this will be used, otherwise the
			//		full Acme engine will be loaded.
			//
			//		- css3: If the browser has a native selector engine with support for CSS3 pseudo
			//		selectors (most modern browsers except IE8), this will be used, otherwise the
			//		full Acme engine will be loaded.
			//
			//		- Or the module id of a selector engine can be used to explicitly choose the selector engine
			//
			//		For example, if you are using CSS3 pseudo selectors in module, you can specify that
			//		you will need support them with:
			//		|	require(["dojo/query!css3"], function(query){
			//		|		query('#t > h3:nth-child(odd)')...
			//
			//		You can also choose the selector engine/load configuration by setting the query-selector:
			//		For example:
			//		|	<script data-dojo-config="query-selector:'css3'" src="dojo.js"></script>
			//
			return new NodeList(); // dojo/NodeList
		 };
		 =====*/
	
		// the query that is returned from this module is slightly different than dojo.query,
		// because dojo.query has to maintain backwards compatibility with returning a
		// true array which has performance problems. The query returned from the module
		// does not use true arrays, but rather inherits from Array, making it much faster to
		// instantiate.
		dojo.query = queryForEngine(defaultEngine, function(array){
			// call it without the new operator to invoke the back-compat behavior that returns a true array
			return NodeList(array);	// dojo/NodeList
		});
	
		query.load = function(id, parentRequire, loaded){
			// summary:
			//		can be used as AMD plugin to conditionally load new query engine
			// example:
			//	|	require(["dojo/query!custom"], function(qsa){
			//	|		// loaded selector/custom.js as engine
			//	|		qsa("#foobar").forEach(...);
			//	|	});
			loader.load(id, parentRequire, function(engine){
				loaded(queryForEngine(engine, NodeList));
			});
		};
	
		dojo._filterQueryResult = query._filterResult = function(nodes, selector, root){
			return new NodeList(query.filter(nodes, selector, root));
		};
		dojo.NodeList = query.NodeList = NodeList;
		return query;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, require){
	
	"use strict";
	var testDiv = document.createElement("div");
	has.add("dom-qsa2.1", !!testDiv.querySelectorAll);
	has.add("dom-qsa3", function(){
				// test to see if we have a reasonable native selector engine available
				try{
					testDiv.innerHTML = "<p class='TEST'></p>"; // test kind of from sizzle
					// Safari can't handle uppercase or unicode characters when
					// in quirks mode, IE8 can't handle pseudos like :empty
					return testDiv.querySelectorAll(".TEST:empty").length == 1;
				}catch(e){}
			});
	var fullEngine;
	var acme = "./acme", lite = "./lite";
	return {
		// summary:
		//		This module handles loading the appropriate selector engine for the given browser
	
		load: function(id, parentRequire, loaded, config){
			var req = require;
			// here we implement the default logic for choosing a selector engine
			id = id == "default" ? has("config-selectorEngine") || "css3" : id;
			id = id == "css2" || id == "lite" ? lite :
					id == "css2.1" ? has("dom-qsa2.1") ? lite : acme :
					id == "css3" ? has("dom-qsa3") ? lite : acme :
					id == "acme" ? acme : (req = parentRequire) && id;
			if(id.charAt(id.length-1) == '?'){
				id = id.substring(0,id.length - 1);
				var optionalLoad = true;
			}
			// the query engine is optional, only load it if a native one is not available or existing one has not been loaded
			if(optionalLoad && (has("dom-compliant-qsa") || fullEngine)){
				return loaded(fullEngine);
			}
			// load the referenced selector engine
			req([id], function(engine){
				if(id != "./lite"){
					fullEngine = engine;
				}
				loaded(engine);
			});
		}
	};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, dojo){
	"use strict";
	
	var testDiv = document.createElement("div");
	var matchesSelector = testDiv.matches || testDiv.webkitMatchesSelector || testDiv.mozMatchesSelector || testDiv.msMatchesSelector || testDiv.oMatchesSelector;
	var querySelectorAll = testDiv.querySelectorAll;
	var unionSplit = /([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g;
	has.add("dom-matches-selector", !!matchesSelector);
	has.add("dom-qsa", !!querySelectorAll); 
	
	// this is a simple query engine. It has handles basic selectors, and for simple
	// common selectors is extremely fast
	var liteEngine = function(selector, root){
		// summary:
		//		A small lightweight query selector engine that implements CSS2.1 selectors
		//		minus pseudo-classes and the sibling combinator, plus CSS3 attribute selectors
	
		if(combine && selector.indexOf(',') > -1){
			return combine(selector, root);
		}
		// use the root's ownerDocument if provided, otherwise try to use dojo.doc. Note 
		// that we don't use dojo/_base/window's doc to reduce dependencies, and 
		// fallback to plain document if dojo.doc hasn't been defined (by dojo/_base/window).
		// presumably we will have a better way to do this in 2.0 
		var doc = root ? root.ownerDocument || root : dojo.doc || document, 
			match = (querySelectorAll ? 
				/^([\w]*)#([\w\-]+$)|^(\.)([\w\-\*]+$)|^(\w+$)/ : // this one only matches on simple queries where we can beat qSA with specific methods
				/^([\w]*)#([\w\-]+)(?:\s+(.*))?$|(?:^|(>|.+\s+))([\w\-\*]+)(\S*$)/) // this one matches parts of the query that we can use to speed up manual filtering
				.exec(selector);
		root = root || doc;
		if(match){
			var isInsideDomTree = has('ie') === 8 && has('quirks')?
				root.nodeType === doc.nodeType:
				root.parentNode !== null && root.nodeType !== 9 && root.parentNode === doc;
	
			// fast path regardless of whether or not querySelectorAll exists
			if(match[2] && isInsideDomTree){
				// an #id
				// use dojo.byId if available as it fixes the id retrieval in IE, note that we can't use the dojo namespace in 2.0, but if there is a conditional module use, we will use that
				var found = dojo.byId ? dojo.byId(match[2], doc) : doc.getElementById(match[2]);
				if(!found || (match[1] && match[1] != found.tagName.toLowerCase())){
					// if there is a tag qualifer and it doesn't match, no matches
					return [];
				}
				if(root != doc){
					// there is a root element, make sure we are a child of it
					var parent = found;
					while(parent != root){
						parent = parent.parentNode;
						if(!parent){
							return [];
						}
					}
				}
				return match[3] ?
						liteEngine(match[3], found) 
						: [found];
			}
			if(match[3] && root.getElementsByClassName){
				// a .class
				return root.getElementsByClassName(match[4]);
			}
			var found;
			if(match[5]){
				// a tag
				found = root.getElementsByTagName(match[5]);
				if(match[4] || match[6]){
					selector = (match[4] || "") + match[6];
				}else{
					// that was the entirety of the query, return results
					return found;
				}
			}
		}
		if(querySelectorAll){
			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if (root.nodeType === 1 && root.nodeName.toLowerCase() !== "object"){				
				return useRoot(root, selector, root.querySelectorAll);
			}else{
				// we can use the native qSA
				return root.querySelectorAll(selector);
			}
		}else if(!found){
			// search all children and then filter
			found = root.getElementsByTagName("*");
		}
		// now we filter the nodes that were found using the matchesSelector
		var results = [];
		for(var i = 0, l = found.length; i < l; i++){
			var node = found[i];
			if(node.nodeType == 1 && jsMatchesSelector(node, selector, root)){
				// keep the nodes that match the selector
				results.push(node);
			}
		}
		return results;
	};
	var useRoot = function(context, query, method){
		// this function creates a temporary id so we can do rooted qSA queries, this is taken from sizzle
		var oldContext = context,
			old = context.getAttribute("id"),
			nid = old || "__dojo__",
			hasParent = context.parentNode,
			relativeHierarchySelector = /^\s*[+~]/.test(query);
	
		if(relativeHierarchySelector && !hasParent){
			return [];
		}
		if(!old){
			context.setAttribute("id", nid);
		}else{
			nid = nid.replace(/'/g, "\\$&");
		}
		if(relativeHierarchySelector && hasParent){
			context = context.parentNode;
		}
		var selectors = query.match(unionSplit);
		for(var i = 0; i < selectors.length; i++){
			selectors[i] = "[id='" + nid + "'] " + selectors[i];
		}
		query = selectors.join(",");
	
		try{
			return method.call(context, query);
		}finally{
			if(!old){
				oldContext.removeAttribute("id");
			}
		}
	};
	
	if(!has("dom-matches-selector")){
		var jsMatchesSelector = (function(){
			// a JS implementation of CSS selector matching, first we start with the various handlers
			var caseFix = testDiv.tagName == "div" ? "toLowerCase" : "toUpperCase";
			var selectorTypes = {
				"": function(tagName){
					tagName = tagName[caseFix]();
					return function(node){
						return node.tagName == tagName;
					};
				},
				".": function(className){
					var classNameSpaced = ' ' + className + ' ';
					return function(node){
						return node.className.indexOf(className) > -1 && (' ' + node.className + ' ').indexOf(classNameSpaced) > -1;
					};
				},
				"#": function(id){
					return function(node){
						return node.id == id;
					};
				}
			};
			var attrComparators = {
				"^=": function(attrValue, value){
					return attrValue.indexOf(value) == 0;
				},
				"*=": function(attrValue, value){
					return attrValue.indexOf(value) > -1;
				},
				"$=": function(attrValue, value){
					return attrValue.substring(attrValue.length - value.length, attrValue.length) == value;
				},
				"~=": function(attrValue, value){
					return (' ' + attrValue + ' ').indexOf(' ' + value + ' ') > -1;
				},
				"|=": function(attrValue, value){
					return (attrValue + '-').indexOf(value + '-') == 0;
				},
				"=": function(attrValue, value){
					return attrValue == value;
				},
				"": function(attrValue, value){
					return true;
				}
			};
			function attr(name, value, type){
				var firstChar = value.charAt(0);
				if(firstChar == '"' || firstChar == "'"){
					// it is quoted, remove the quotes
					value = value.slice(1, -1);
				}
				value = value.replace(/\\/g,'');
				var comparator = attrComparators[type || ""];
				return function(node){
					var attrValue = node.getAttribute(name);
					return attrValue && comparator(attrValue, value);
				};
			}
			function ancestor(matcher){
				return function(node, root){
					while((node = node.parentNode) != root){
						if(matcher(node, root)){
							return true;
						}
					}
				};
			}
			function parent(matcher){
				return function(node, root){
					node = node.parentNode;
					return matcher ? 
						node != root && matcher(node, root)
						: node == root;
				};
			}
			var cache = {};
			function and(matcher, next){
				return matcher ?
					function(node, root){
						return next(node) && matcher(node, root);
					}
					: next;
			}
			return function(node, selector, root){
				// this returns true or false based on if the node matches the selector (optionally within the given root)
				var matcher = cache[selector]; // check to see if we have created a matcher function for the given selector
				if(!matcher){
					// create a matcher function for the given selector
					// parse the selectors
					if(selector.replace(/(?:\s*([> ])\s*)|(#|\.)?((?:\\.|[\w-])+)|\[\s*([\w-]+)\s*(.?=)?\s*("(?:\\.|[^"])+"|'(?:\\.|[^'])+'|(?:\\.|[^\]])*)\s*\]/g, function(t, combinator, type, value, attrName, attrType, attrValue){
						if(value){
							matcher = and(matcher, selectorTypes[type || ""](value.replace(/\\/g, '')));
						}
						else if(combinator){
							matcher = (combinator == " " ? ancestor : parent)(matcher);
						}
						else if(attrName){
							matcher = and(matcher, attr(attrName, attrValue, attrType));
						}
						return "";
					})){
						throw new Error("Syntax error in query");
					}
					if(!matcher){
						return true;
					}
					cache[selector] = matcher;
				}
				// now run the matcher function on the node
				return matcher(node, root);
			};
		})();
	}
	if(!has("dom-qsa")){
		var combine = function(selector, root){
			// combined queries
			var selectors = selector.match(unionSplit);
			var indexed = [];
			// add all results and keep unique ones, this only runs in IE, so we take advantage 
			// of known IE features, particularly sourceIndex which is unique and allows us to 
			// order the results 
			for(var i = 0; i < selectors.length; i++){
				selector = new String(selectors[i].replace(/\s*$/,''));
				selector.indexOf = escape; // keep it from recursively entering combine
				var results = liteEngine(selector, root);
				for(var j = 0, l = results.length; j < l; j++){
					var node = results[j];
					indexed[node.sourceIndex] = node;
				}
			}
			// now convert from a sparse array to a dense array
			var totalResults = [];
			for(i in indexed){
				totalResults.push(indexed[i]);
			}
			return totalResults;
		};
	}
	
	liteEngine.match = matchesSelector ? function(node, selector, root){
		if(root && root.nodeType != 9){
			// doesn't support three args, use rooted id trick
			return useRoot(root, selector, function(query){
				return matchesSelector.call(node, query);
			});
		}
		// we have a native matchesSelector, use that
		return matchesSelector.call(node, selector);
	} : jsMatchesSelector; // otherwise use the JS matches impl
	
	return liteEngine;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(34), __webpack_require__(8), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dquery, lang, array){
	
	// module:
	//		dojo/NodeList-traverse
	
	/*=====
	return function(){
		// summary:
		//		Adds chainable methods to dojo/query() / NodeList instances for traversing the DOM
	};
	=====*/
	
	var NodeList = dquery.NodeList;
	
	lang.extend(NodeList, {
		_buildArrayFromCallback: function(/*Function*/ callback){
			// summary:
			//		builds a new array of possibly differing size based on the input list.
			//		Since the returned array is likely of different size than the input array,
			//		the array's map function cannot be used.
			var ary = [];
			for(var i = 0; i < this.length; i++){
				var items = callback.call(this[i], this[i], ary);
				if(items){
					ary = ary.concat(items);
				}
			}
			return ary;	//Array
		},
	
		_getUniqueAsNodeList: function(/*Array*/ nodes){
			// summary:
			//		given a list of nodes, make sure only unique
			//		elements are returned as our NodeList object.
			//		Does not call _stash().
			var ary = [];
			//Using for loop for better speed.
			for(var i = 0, node; node = nodes[i]; i++){
				//Should be a faster way to do this. dojo/query has a private
				//_zip function that may be inspirational, but there are pathways
				//in query that force nozip?
				if(node.nodeType == 1 && array.indexOf(ary, node) == -1){
					ary.push(node);
				}
			}
			return this._wrap(ary, null, this._NodeListCtor);	 // dojo/NodeList
		},
	
		_getUniqueNodeListWithParent: function(/*Array*/ nodes, /*String*/ query){
			// summary:
			//		gets unique element nodes, filters them further
			//		with an optional query and then calls _stash to track parent NodeList.
			var ary = this._getUniqueAsNodeList(nodes);
			ary = (query ? dquery._filterResult(ary, query) : ary);
			return ary._stash(this);  // dojo/NodeList
		},
	
		_getRelatedUniqueNodes: function(/*String?*/ query, /*Function*/ callback){
			// summary:
			//		cycles over all the nodes and calls a callback
			//		to collect nodes for a possible inclusion in a result.
			//		The callback will get two args: callback(node, ary),
			//		where ary is the array being used to collect the nodes.
			return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(callback), query);  // dojo/NodeList
		},
	
		children: function(/*String?*/ query){
			// summary:
			//		Returns all immediate child elements for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the child elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		all immediate child elements for the nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".container").children();
			//	|	});
			//		returns the four divs that are children of the container div.
			//		Running this code:
			//	|	dojo.query(".container").children(".red");
			//		returns the two divs that have the class "red".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				return lang._toArray(node.childNodes);
			}); // dojo/NodeList
		},
	
		closest: function(/*String*/ query, /*String|DOMNode?*/ root){
			// summary:
			//		Returns closest parent that matches query, including current node in this
			//		dojo/NodeList if it matches the query.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// root:
			//		If specified, query is relative to "root" rather than document body.
			// returns:
			//		the closest parent that matches the query, including the current
			//		node in this dojo/NodeList if it matches the query.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			//	|		<div class="red">Red One</div>
			//	|		Some Text
			//	|		<div class="blue">Blue One</div>
			//	|		<div class="red">Red Two</div>
			//	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".red").closest(".container");
			//	|	});
			//		returns the div with class "container".
			return this._getRelatedUniqueNodes(null, function(node, ary){
				do{
					if(dquery._filterResult([node], query, root).length){
						return node;
					}
				}while(node != root && (node = node.parentNode) && node.nodeType == 1);
				return null; //To make rhino strict checking happy.
			}); // dojo/NodeList
		},
	
		parent: function(/*String?*/ query){
			// summary:
			//		Returns immediate parent elements for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the parent elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		immediate parent elements for nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue first"><span class="text">Blue One</span></div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue"><span class="text">Blue Two</span></div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".text").parent();
			//	|	});
			//		returns the two divs with class "blue".
			//		Running this code:
			//	|		query(".text").parent(".first");
			//		returns the one div with class "blue" and "first".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				return node.parentNode;
			}); // dojo/NodeList
		},
	
		parents: function(/*String?*/ query){
			// summary:
			//		Returns all parent elements for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the child elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		all parent elements for nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue first"><span class="text">Blue One</span></div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue"><span class="text">Blue Two</span></div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".text").parents();
			//	|	});
			//		returns the two divs with class "blue", the div with class "container",
			// 	|	the body element and the html element.
			//		Running this code:
			//	|		query(".text").parents(".container");
			//		returns the one div with class "container".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var pary = [];
				while(node.parentNode){
					node = node.parentNode;
					pary.push(node);
				}
				return pary;
			}); // dojo/NodeList
		},
	
		siblings: function(/*String?*/ query){
			// summary:
			//		Returns all sibling elements for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the sibling elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		all sibling elements for nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".first").siblings();
			//	|	});
			//		returns the two divs with class "red" and the other div
			// 	|	with class "blue" that does not have "first".
			//		Running this code:
			//	|		query(".first").siblings(".red");
			//		returns the two div with class "red".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var pary = [];
				var nodes = (node.parentNode && node.parentNode.childNodes);
				for(var i = 0; i < nodes.length; i++){
					if(nodes[i] != node){
						pary.push(nodes[i]);
					}
				}
				return pary;
			}); // dojo/NodeList
		},
	
		next: function(/*String?*/ query){
			// summary:
			//		Returns the next element for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the next elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		the next element for nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue last">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".first").next();
			//	|	});
			//		returns the div with class "red" and has innerHTML of "Red Two".
			//		Running this code:
			//	|	dojo.query(".last").next(".red");
			//		does not return any elements.
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var next = node.nextSibling;
				while(next && next.nodeType != 1){
					next = next.nextSibling;
				}
				return next;
			}); // dojo/NodeList
		},
	
		nextAll: function(/*String?*/ query){
			// summary:
			//		Returns all sibling elements that come after the nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the sibling elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		all sibling elements that come after the nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red next">Red Two</div>
			// 	|		<div class="blue next">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".first").nextAll();
			//	|	});
			//		returns the two divs with class of "next".
			//		Running this code:
			//	|		query(".first").nextAll(".red");
			//		returns the one div with class "red" and innerHTML "Red Two".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var pary = [];
				var next = node;
				while((next = next.nextSibling)){
					if(next.nodeType == 1){
						pary.push(next);
					}
				}
				return pary;
			}); // dojo/NodeList
		},
	
		prev: function(/*String?*/ query){
			// summary:
			//		Returns the previous element for nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the previous elements.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		the previous element for nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".first").prev();
			//	|	});
			//		returns the div with class "red" and has innerHTML of "Red One".
			//		Running this code:
			//	|		query(".first").prev(".blue");
			//		does not return any elements.
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var prev = node.previousSibling;
				while(prev && prev.nodeType != 1){
					prev = prev.previousSibling;
				}
				return prev;
			}); // dojo/NodeList
		},
	
		prevAll: function(/*String?*/ query){
			// summary:
			//		Returns all sibling elements that come before the nodes in this dojo/NodeList.
			//		Optionally takes a query to filter the sibling elements.
			// description:
			//		The returned nodes will be in reverse DOM order -- the first node in the list will
			//		be the node closest to the original node/NodeList.
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// query:
			//		a CSS selector.
			// returns:
			//		all sibling elements that come before the nodes in this dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red prev">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue prev">Blue One</div>
			// 	|		<div class="red second">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".second").prevAll();
			//	|	});
			//		returns the two divs with class of "prev".
			//		Running this code:
			//	|		query(".first").prevAll(".red");
			//		returns the one div with class "red prev" and innerHTML "Red One".
			return this._getRelatedUniqueNodes(query, function(node, ary){
				var pary = [];
				var prev = node;
				while((prev = prev.previousSibling)){
					if(prev.nodeType == 1){
						pary.push(prev);
					}
				}
				return pary;
			}); // dojo/NodeList
		},
	
		andSelf: function(){
			// summary:
			//		Adds the nodes from the previous dojo/NodeList to the current dojo/NodeList.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red prev">Red One</div>
			// 	|		Some Text
			// 	|		<div class="blue prev">Blue One</div>
			// 	|		<div class="red second">Red Two</div>
			// 	|		<div class="blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".second").prevAll().andSelf();
			//	|	});
			//		returns the two divs with class of "prev", as well as the div with class "second".
			return this.concat(this._parent);	// dojo/NodeList
		},
	
		//Alternate methods for the :first/:last/:even/:odd pseudos.
		first: function(){
			// summary:
			//		Returns the first node in this dojo/NodeList as a dojo/NodeList.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// returns:
			//		the first node in this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue last">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".blue").first();
			//	|	});
			//		returns the div with class "blue" and "first".
			return this._wrap(((this[0] && [this[0]]) || []), this); // dojo/NodeList
		},
	
		last: function(){
			// summary:
			//		Returns the last node in this dojo/NodeList as a dojo/NodeList.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// returns:
			//		the last node in this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="red">Red One</div>
			// 	|		<div class="blue first">Blue One</div>
			// 	|		<div class="red">Red Two</div>
			// 	|		<div class="blue last">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|	query(".blue").last();
			//	|	});
			//		returns the last div with class "blue",
			return this._wrap((this.length ? [this[this.length - 1]] : []), this); // dojo/NodeList
		},
	
		even: function(){
			// summary:
			//		Returns the even nodes in this dojo/NodeList as a dojo/NodeList.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// returns:
			//		the even nodes in this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="interior red">Red One</div>
			// 	|		<div class="interior blue">Blue One</div>
			// 	|		<div class="interior red">Red Two</div>
			// 	|		<div class="interior blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".interior").even();
			//	|	});
			//		returns the two divs with class "blue"
			return this.filter(function(item, i){
				return i % 2 != 0;
			}); // dojo/NodeList
		},
	
		odd: function(){
			// summary:
			//		Returns the odd nodes in this dojo/NodeList as a dojo/NodeList.
			// description:
			//		.end() can be used on the returned dojo/NodeList to get back to the
			//		original dojo/NodeList.
			// returns:
			//		the odd nodes in this dojo/NodeList
			// example:
			//		assume a DOM created by this markup:
			//	|	<div class="container">
			// 	|		<div class="interior red">Red One</div>
			// 	|		<div class="interior blue">Blue One</div>
			// 	|		<div class="interior red">Red Two</div>
			// 	|		<div class="interior blue">Blue Two</div>
			//	|	</div>
			//		Running this code:
			//	|	require(["dojo/query", "dojo/NodeList-traverse"
			//	|	], function(query){
			//	|		query(".interior").odd();
			//	|	});
			//		returns the two divs with class "red"
			return this.filter(function(item, i){
				return i % 2 == 0;
			}); // dojo/NodeList
		}
	});
	
	return NodeList;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }

/******/ });
//# sourceMappingURL=dojo_03_keyboard.bundle.js.map