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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Example from: http://dgrid.io/tutorials/1.0/defining_grid_structures/
	var declare = __webpack_require__(1);
	var RequestMemory = __webpack_require__(37);
	var OnDemandGrid = __webpack_require__(61);
	var CompoundColumns = __webpack_require__(65);
	
	var CustomGrid = declare([ OnDemandGrid, CompoundColumns ]);
	var grid = new CustomGrid({
	    collection: new RequestMemory({ target: 'example-resources/hof-batting.json' }),
	    columns: [
	        {
	            label: 'Full Name',
	            children: [
	                { field: 'first', label: 'First' },
	                { field: 'last', label: 'Last' }
	            ]
	        },
	        { field: 'totalGAB', label: 'Games as Batter' }
	    ]
	}, 'grid');
	
	grid.startup();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(dojo, has, lang){
		// module:
		//		dojo/_base/declare
	
		var mix = lang.mixin, op = Object.prototype, opts = op.toString,
			xtor, counter = 0, cname = "constructor";
	
		if(!has("csp-restrictions")){
			xtor = new Function;
		}else{
			xtor = function(){};
		}
	
		function err(msg, cls){ throw new Error("declare" + (cls ? " " + cls : "") + ": " + msg); }
	
		// C3 Method Resolution Order (see http://www.python.org/download/releases/2.3/mro/)
		function c3mro(bases, className){
			var result = [], roots = [{cls: 0, refs: []}], nameMap = {}, clsCount = 1,
				l = bases.length, i = 0, j, lin, base, top, proto, rec, name, refs;
	
			// build a list of bases naming them if needed
			for(; i < l; ++i){
				base = bases[i];
				if(!base){
					err("mixin #" + i + " is unknown. Did you use dojo.require to pull it in?", className);
				}else if(opts.call(base) != "[object Function]"){
					err("mixin #" + i + " is not a callable constructor.", className);
				}
				lin = base._meta ? base._meta.bases : [base];
				top = 0;
				// add bases to the name map
				for(j = lin.length - 1; j >= 0; --j){
					proto = lin[j].prototype;
					if(!proto.hasOwnProperty("declaredClass")){
						proto.declaredClass = "uniqName_" + (counter++);
					}
					name = proto.declaredClass;
					if(!nameMap.hasOwnProperty(name)){
						nameMap[name] = {count: 0, refs: [], cls: lin[j]};
						++clsCount;
					}
					rec = nameMap[name];
					if(top && top !== rec){
						rec.refs.push(top);
						++top.count;
					}
					top = rec;
				}
				++top.count;
				roots[0].refs.push(top);
			}
	
			// remove classes without external references recursively
			while(roots.length){
				top = roots.pop();
				result.push(top.cls);
				--clsCount;
				// optimization: follow a single-linked chain
				while(refs = top.refs, refs.length == 1){
					top = refs[0];
					if(!top || --top.count){
						// branch or end of chain => do not end to roots
						top = 0;
						break;
					}
					result.push(top.cls);
					--clsCount;
				}
				if(top){
					// branch
					for(i = 0, l = refs.length; i < l; ++i){
						top = refs[i];
						if(!--top.count){
							roots.push(top);
						}
					}
				}
			}
			if(clsCount){
				err("can't build consistent linearization", className);
			}
	
			// calculate the superclass offset
			base = bases[0];
			result[0] = base ?
				base._meta && base === result[result.length - base._meta.bases.length] ?
					base._meta.bases.length : 1 : 0;
	
			return result;
		}
	
		function inherited(args, a, f){
			var name, chains, bases, caller, meta, base, proto, opf, pos,
				cache = this._inherited = this._inherited || {};
	
			// crack arguments
			if(typeof args == "string"){
				name = args;
				args = a;
				a = f;
			}
			f = 0;
	
			caller = args.callee;
			name = name || caller.nom;
			if(!name){
				err("can't deduce a name to call inherited()", this.declaredClass);
			}
	
			meta = this.constructor._meta;
			bases = meta.bases;
	
			pos = cache.p;
			if(name != cname){
				// method
				if(cache.c !== caller){
					// cache bust
					pos = 0;
					base = bases[0];
					meta = base._meta;
					if(meta.hidden[name] !== caller){
						// error detection
						chains = meta.chains;
						if(chains && typeof chains[name] == "string"){
							err("calling chained method with inherited: " + name, this.declaredClass);
						}
						// find caller
						do{
							meta = base._meta;
							proto = base.prototype;
							if(meta && (proto[name] === caller && proto.hasOwnProperty(name) || meta.hidden[name] === caller)){
								break;
							}
						}while(base = bases[++pos]); // intentional assignment
						pos = base ? pos : -1;
					}
				}
				// find next
				base = bases[++pos];
				if(base){
					proto = base.prototype;
					if(base._meta && proto.hasOwnProperty(name)){
						f = proto[name];
					}else{
						opf = op[name];
						do{
							proto = base.prototype;
							f = proto[name];
							if(f && (base._meta ? proto.hasOwnProperty(name) : f !== opf)){
								break;
							}
						}while(base = bases[++pos]); // intentional assignment
					}
				}
				f = base && f || op[name];
			}else{
				// constructor
				if(cache.c !== caller){
					// cache bust
					pos = 0;
					meta = bases[0]._meta;
					if(meta && meta.ctor !== caller){
						// error detection
						chains = meta.chains;
						if(!chains || chains.constructor !== "manual"){
							err("calling chained constructor with inherited", this.declaredClass);
						}
						// find caller
						while(base = bases[++pos]){ // intentional assignment
							meta = base._meta;
							if(meta && meta.ctor === caller){
								break;
							}
						}
						pos = base ? pos : -1;
					}
				}
				// find next
				while(base = bases[++pos]){	// intentional assignment
					meta = base._meta;
					f = meta ? meta.ctor : base;
					if(f){
						break;
					}
				}
				f = base && f;
			}
	
			// cache the found super method
			cache.c = f;
			cache.p = pos;
	
			// now we have the result
			if(f){
				return a === true ? f : f.apply(this, a || args);
			}
			// intentionally no return if a super method was not found
		}
	
		function getInherited(name, args){
			if(typeof name == "string"){
				return this.__inherited(name, args, true);
			}
			return this.__inherited(name, true);
		}
	
		function inherited__debug(args, a1, a2){
			var f = this.getInherited(args, a1);
			if(f){ return f.apply(this, a2 || a1 || args); }
			// intentionally no return if a super method was not found
		}
	
		var inheritedImpl = dojo.config.isDebug ? inherited__debug : inherited;
	
		// emulation of "instanceof"
		function isInstanceOf(cls){
			var bases = this.constructor._meta.bases;
			for(var i = 0, l = bases.length; i < l; ++i){
				if(bases[i] === cls){
					return true;
				}
			}
			return this instanceof cls;
		}
	
		function mixOwn(target, source){
			// add props adding metadata for incoming functions skipping a constructor
			for(var name in source){
				if(name != cname && source.hasOwnProperty(name)){
					target[name] = source[name];
				}
			}
			if(has("bug-for-in-skips-shadowed")){
				for(var extraNames= lang._extraNames, i= extraNames.length; i;){
					name = extraNames[--i];
					if(name != cname && source.hasOwnProperty(name)){
						  target[name] = source[name];
					}
				}
			}
		}
	
		// implementation of safe mixin function
		function safeMixin(target, source){
			// summary:
			//		Mix in properties skipping a constructor and decorating functions
			//		like it is done by declare().
			// target: Object
			//		Target object to accept new properties.
			// source: Object
			//		Source object for new properties.
			// description:
			//		This function is used to mix in properties like lang.mixin does,
			//		but it skips a constructor property and decorates functions like
			//		declare() does.
			//
			//		It is meant to be used with classes and objects produced with
			//		declare. Functions mixed in with dojo.safeMixin can use
			//		this.inherited() like normal methods.
			//
			//		This function is used to implement extend() method of a constructor
			//		produced with declare().
			//
			// example:
			//	|	var A = declare(null, {
			//	|		m1: function(){
			//	|			console.log("A.m1");
			//	|		},
			//	|		m2: function(){
			//	|			console.log("A.m2");
			//	|		}
			//	|	});
			//	|	var B = declare(A, {
			//	|		m1: function(){
			//	|			this.inherited(arguments);
			//	|			console.log("B.m1");
			//	|		}
			//	|	});
			//	|	B.extend({
			//	|		m2: function(){
			//	|			this.inherited(arguments);
			//	|			console.log("B.m2");
			//	|		}
			//	|	});
			//	|	var x = new B();
			//	|	dojo.safeMixin(x, {
			//	|		m1: function(){
			//	|			this.inherited(arguments);
			//	|			console.log("X.m1");
			//	|		},
			//	|		m2: function(){
			//	|			this.inherited(arguments);
			//	|			console.log("X.m2");
			//	|		}
			//	|	});
			//	|	x.m2();
			//	|	// prints:
			//	|	// A.m1
			//	|	// B.m1
			//	|	// X.m1
	
			var name, t;
			// add props adding metadata for incoming functions skipping a constructor
			for(name in source){
				t = source[name];
				if((t !== op[name] || !(name in op)) && name != cname){
					if(opts.call(t) == "[object Function]"){
						// non-trivial function method => attach its name
						t.nom = name;
					}
					target[name] = t;
				}
			}
			if(has("bug-for-in-skips-shadowed") && source){
				for(var extraNames= lang._extraNames, i= extraNames.length; i;){
					name = extraNames[--i];
					t = source[name];
					if((t !== op[name] || !(name in op)) && name != cname){
						if(opts.call(t) == "[object Function]"){
							// non-trivial function method => attach its name
							  t.nom = name;
						}
						target[name] = t;
					}
				}
			}
			return target;
		}
	
		function extend(source){
			declare.safeMixin(this.prototype, source);
			return this;
		}
	
	    function createSubclass(mixins, props){
	        // crack parameters
	        if(!(mixins instanceof Array || typeof mixins == 'function')){
	            props = mixins;
	            mixins = undefined;
	        }
	
	        props = props || {};
	        mixins = mixins || [];
	
	        return declare([this].concat(mixins), props);
	    }
	
		// chained constructor compatible with the legacy declare()
		function chainedConstructor(bases, ctorSpecial){
			return function(){
				var a = arguments, args = a, a0 = a[0], f, i, m,
					l = bases.length, preArgs;
	
				if(!(this instanceof a.callee)){
					// not called via new, so force it
					return applyNew(a);
				}
	
				//this._inherited = {};
				// perform the shaman's rituals of the original declare()
				// 1) call two types of the preamble
				if(ctorSpecial && (a0 && a0.preamble || this.preamble)){
					// full blown ritual
					preArgs = new Array(bases.length);
					// prepare parameters
					preArgs[0] = a;
					for(i = 0;;){
						// process the preamble of the 1st argument
						a0 = a[0];
						if(a0){
							f = a0.preamble;
							if(f){
								a = f.apply(this, a) || a;
							}
						}
						// process the preamble of this class
						f = bases[i].prototype;
						f = f.hasOwnProperty("preamble") && f.preamble;
						if(f){
							a = f.apply(this, a) || a;
						}
						// one peculiarity of the preamble:
						// it is called if it is not needed,
						// e.g., there is no constructor to call
						// let's watch for the last constructor
						// (see ticket #9795)
						if(++i == l){
							break;
						}
						preArgs[i] = a;
					}
				}
				// 2) call all non-trivial constructors using prepared arguments
				for(i = l - 1; i >= 0; --i){
					f = bases[i];
					m = f._meta;
					f = m ? m.ctor : f;
					if(f){
						f.apply(this, preArgs ? preArgs[i] : a);
					}
				}
				// 3) continue the original ritual: call the postscript
				f = this.postscript;
				if(f){
					f.apply(this, args);
				}
			};
		}
	
	
		// chained constructor compatible with the legacy declare()
		function singleConstructor(ctor, ctorSpecial){
			return function(){
				var a = arguments, t = a, a0 = a[0], f;
	
				if(!(this instanceof a.callee)){
					// not called via new, so force it
					return applyNew(a);
				}
	
				//this._inherited = {};
				// perform the shaman's rituals of the original declare()
				// 1) call two types of the preamble
				if(ctorSpecial){
					// full blown ritual
					if(a0){
						// process the preamble of the 1st argument
						f = a0.preamble;
						if(f){
							t = f.apply(this, t) || t;
						}
					}
					f = this.preamble;
					if(f){
						// process the preamble of this class
						f.apply(this, t);
						// one peculiarity of the preamble:
						// it is called even if it is not needed,
						// e.g., there is no constructor to call
						// let's watch for the last constructor
						// (see ticket #9795)
					}
				}
				// 2) call a constructor
				if(ctor){
					ctor.apply(this, a);
				}
				// 3) continue the original ritual: call the postscript
				f = this.postscript;
				if(f){
					f.apply(this, a);
				}
			};
		}
	
		// plain vanilla constructor (can use inherited() to call its base constructor)
		function simpleConstructor(bases){
			return function(){
				var a = arguments, i = 0, f, m;
	
				if(!(this instanceof a.callee)){
					// not called via new, so force it
					return applyNew(a);
				}
	
				//this._inherited = {};
				// perform the shaman's rituals of the original declare()
				// 1) do not call the preamble
				// 2) call the top constructor (it can use this.inherited())
				for(; f = bases[i]; ++i){ // intentional assignment
					m = f._meta;
					f = m ? m.ctor : f;
					if(f){
						f.apply(this, a);
						break;
					}
				}
				// 3) call the postscript
				f = this.postscript;
				if(f){
					f.apply(this, a);
				}
			};
		}
	
		function chain(name, bases, reversed){
			return function(){
				var b, m, f, i = 0, step = 1;
				if(reversed){
					i = bases.length - 1;
					step = -1;
				}
				for(; b = bases[i]; i += step){ // intentional assignment
					m = b._meta;
					f = (m ? m.hidden : b.prototype)[name];
					if(f){
						f.apply(this, arguments);
					}
				}
			};
		}
	
		// forceNew(ctor)
		// return a new object that inherits from ctor.prototype but
		// without actually running ctor on the object.
		function forceNew(ctor){
			// create object with correct prototype using a do-nothing
			// constructor
			xtor.prototype = ctor.prototype;
			var t = new xtor;
			xtor.prototype = null;	// clean up
			return t;
		}
	
		// applyNew(args)
		// just like 'new ctor()' except that the constructor and its arguments come
		// from args, which must be an array or an arguments object
		function applyNew(args){
			// create an object with ctor's prototype but without
			// calling ctor on it.
			var ctor = args.callee, t = forceNew(ctor);
			// execute the real constructor on the new object
			ctor.apply(t, args);
			return t;
		}
	
		function declare(className, superclass, props){
			// summary:
			//		Create a feature-rich constructor from compact notation.
			// className: String?
			//		The optional name of the constructor (loosely, a "class")
			//		stored in the "declaredClass" property in the created prototype.
			//		It will be used as a global name for a created constructor.
			// superclass: Function|Function[]
			//		May be null, a Function, or an Array of Functions. This argument
			//		specifies a list of bases (the left-most one is the most deepest
			//		base).
			// props: Object
			//		An object whose properties are copied to the created prototype.
			//		Add an instance-initialization function by making it a property
			//		named "constructor".
			// returns: dojo/_base/declare.__DeclareCreatedObject
			//		New constructor function.
			// description:
			//		Create a constructor using a compact notation for inheritance and
			//		prototype extension.
			//
			//		Mixin ancestors provide a type of multiple inheritance.
			//		Prototypes of mixin ancestors are copied to the new class:
			//		changes to mixin prototypes will not affect classes to which
			//		they have been mixed in.
			//
			//		Ancestors can be compound classes created by this version of
			//		declare(). In complex cases all base classes are going to be
			//		linearized according to C3 MRO algorithm
			//		(see http://www.python.org/download/releases/2.3/mro/ for more
			//		details).
			//
			//		"className" is cached in "declaredClass" property of the new class,
			//		if it was supplied. The immediate super class will be cached in
			//		"superclass" property of the new class.
			//
			//		Methods in "props" will be copied and modified: "nom" property
			//		(the declared name of the method) will be added to all copied
			//		functions to help identify them for the internal machinery. Be
			//		very careful, while reusing methods: if you use the same
			//		function under different names, it can produce errors in some
			//		cases.
			//
			//		It is possible to use constructors created "manually" (without
			//		declare()) as bases. They will be called as usual during the
			//		creation of an instance, their methods will be chained, and even
			//		called by "this.inherited()".
			//
			//		Special property "-chains-" governs how to chain methods. It is
			//		a dictionary, which uses method names as keys, and hint strings
			//		as values. If a hint string is "after", this method will be
			//		called after methods of its base classes. If a hint string is
			//		"before", this method will be called before methods of its base
			//		classes.
			//
			//		If "constructor" is not mentioned in "-chains-" property, it will
			//		be chained using the legacy mode: using "after" chaining,
			//		calling preamble() method before each constructor, if available,
			//		and calling postscript() after all constructors were executed.
			//		If the hint is "after", it is chained as a regular method, but
			//		postscript() will be called after the chain of constructors.
			//		"constructor" cannot be chained "before", but it allows
			//		a special hint string: "manual", which means that constructors
			//		are not going to be chained in any way, and programmer will call
			//		them manually using this.inherited(). In the latter case
			//		postscript() will be called after the construction.
			//
			//		All chaining hints are "inherited" from base classes and
			//		potentially can be overridden. Be very careful when overriding
			//		hints! Make sure that all chained methods can work in a proposed
			//		manner of chaining.
			//
			//		Once a method was chained, it is impossible to unchain it. The
			//		only exception is "constructor". You don't need to define a
			//		method in order to supply a chaining hint.
			//
			//		If a method is chained, it cannot use this.inherited() because
			//		all other methods in the hierarchy will be called automatically.
			//
			//		Usually constructors and initializers of any kind are chained
			//		using "after" and destructors of any kind are chained as
			//		"before". Note that chaining assumes that chained methods do not
			//		return any value: any returned value will be discarded.
			//
			// example:
			//	|	declare("my.classes.bar", my.classes.foo, {
			//	|		// properties to be added to the class prototype
			//	|		someValue: 2,
			//	|		// initialization function
			//	|		constructor: function(){
			//	|			this.myComplicatedObject = new ReallyComplicatedObject();
			//	|		},
			//	|		// other functions
			//	|		someMethod: function(){
			//	|			doStuff();
			//	|		}
			//	|	});
			//
			// example:
			//	|	var MyBase = declare(null, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var MyClass1 = declare(MyBase, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var MyClass2 = declare(MyBase, {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//	|	var MyDiamond = declare([MyClass1, MyClass2], {
			//	|		// constructor, properties, and methods go here
			//	|		// ...
			//	|	});
			//
			// example:
			//	|	var F = function(){ console.log("raw constructor"); };
			//	|	F.prototype.method = function(){
			//	|		console.log("raw method");
			//	|	};
			//	|	var A = declare(F, {
			//	|		constructor: function(){
			//	|			console.log("A.constructor");
			//	|		},
			//	|		method: function(){
			//	|			console.log("before calling F.method...");
			//	|			this.inherited(arguments);
			//	|			console.log("...back in A");
			//	|		}
			//	|	});
			//	|	new A().method();
			//	|	// will print:
			//	|	// raw constructor
			//	|	// A.constructor
			//	|	// before calling F.method...
			//	|	// raw method
			//	|	// ...back in A
			//
			// example:
			//	|	var A = declare(null, {
			//	|		"-chains-": {
			//	|			destroy: "before"
			//	|		}
			//	|	});
			//	|	var B = declare(A, {
			//	|		constructor: function(){
			//	|			console.log("B.constructor");
			//	|		},
			//	|		destroy: function(){
			//	|			console.log("B.destroy");
			//	|		}
			//	|	});
			//	|	var C = declare(B, {
			//	|		constructor: function(){
			//	|			console.log("C.constructor");
			//	|		},
			//	|		destroy: function(){
			//	|			console.log("C.destroy");
			//	|		}
			//	|	});
			//	|	new C().destroy();
			//	|	// prints:
			//	|	// B.constructor
			//	|	// C.constructor
			//	|	// C.destroy
			//	|	// B.destroy
			//
			// example:
			//	|	var A = declare(null, {
			//	|		"-chains-": {
			//	|			constructor: "manual"
			//	|		}
			//	|	});
			//	|	var B = declare(A, {
			//	|		constructor: function(){
			//	|			// ...
			//	|			// call the base constructor with new parameters
			//	|			this.inherited(arguments, [1, 2, 3]);
			//	|			// ...
			//	|		}
			//	|	});
			//
			// example:
			//	|	var A = declare(null, {
			//	|		"-chains-": {
			//	|			m1: "before"
			//	|		},
			//	|		m1: function(){
			//	|			console.log("A.m1");
			//	|		},
			//	|		m2: function(){
			//	|			console.log("A.m2");
			//	|		}
			//	|	});
			//	|	var B = declare(A, {
			//	|		"-chains-": {
			//	|			m2: "after"
			//	|		},
			//	|		m1: function(){
			//	|			console.log("B.m1");
			//	|		},
			//	|		m2: function(){
			//	|			console.log("B.m2");
			//	|		}
			//	|	});
			//	|	var x = new B();
			//	|	x.m1();
			//	|	// prints:
			//	|	// B.m1
			//	|	// A.m1
			//	|	x.m2();
			//	|	// prints:
			//	|	// A.m2
			//	|	// B.m2
	
			// crack parameters
			if(typeof className != "string"){
				props = superclass;
				superclass = className;
				className = "";
			}
			props = props || {};
	
			var proto, i, t, ctor, name, bases, chains, mixins = 1, parents = superclass;
	
			// build a prototype
			if(opts.call(superclass) == "[object Array]"){
				// C3 MRO
				bases = c3mro(superclass, className);
				t = bases[0];
				mixins = bases.length - t;
				superclass = bases[mixins];
			}else{
				bases = [0];
				if(superclass){
					if(opts.call(superclass) == "[object Function]"){
						t = superclass._meta;
						bases = bases.concat(t ? t.bases : superclass);
					}else{
						err("base class is not a callable constructor.", className);
					}
				}else if(superclass !== null){
					err("unknown base class. Did you use dojo.require to pull it in?", className);
				}
			}
			if(superclass){
				for(i = mixins - 1;; --i){
					proto = forceNew(superclass);
					if(!i){
						// stop if nothing to add (the last base)
						break;
					}
					// mix in properties
					t = bases[i];
					(t._meta ? mixOwn : mix)(proto, t.prototype);
					// chain in new constructor
					ctor = new Function;
					ctor.superclass = superclass;
					ctor.prototype = proto;
					superclass = proto.constructor = ctor;
				}
			}else{
				proto = {};
			}
			// add all properties
			declare.safeMixin(proto, props);
			// add constructor
			t = props.constructor;
			if(t !== op.constructor){
				t.nom = cname;
				proto.constructor = t;
			}
	
			// collect chains and flags
			for(i = mixins - 1; i; --i){ // intentional assignment
				t = bases[i]._meta;
				if(t && t.chains){
					chains = mix(chains || {}, t.chains);
				}
			}
			if(proto["-chains-"]){
				chains = mix(chains || {}, proto["-chains-"]);
			}
	
			// build ctor
			t = !chains || !chains.hasOwnProperty(cname);
			bases[0] = ctor = (chains && chains.constructor === "manual") ? simpleConstructor(bases) :
				(bases.length == 1 ? singleConstructor(props.constructor, t) : chainedConstructor(bases, t));
	
			// add meta information to the constructor
			ctor._meta  = {bases: bases, hidden: props, chains: chains,
				parents: parents, ctor: props.constructor};
			ctor.superclass = superclass && superclass.prototype;
			ctor.extend = extend;
			ctor.createSubclass = createSubclass;
			ctor.prototype = proto;
			proto.constructor = ctor;
	
			// add "standard" methods to the prototype
			proto.getInherited = getInherited;
			proto.isInstanceOf = isInstanceOf;
			proto.inherited    = inheritedImpl;
			proto.__inherited  = inherited;
	
			// add name if specified
			if(className){
				proto.declaredClass = className;
				lang.setObject(className, ctor);
			}
	
			// build chains and add them to the prototype
			if(chains){
				for(name in chains){
					if(proto[name] && typeof chains[name] == "string" && name != cname){
						t = proto[name] = chain(name, bases, chains[name] === "after");
						t.nom = name;
					}
				}
			}
			// chained methods do not return values
			// no need to chain "invisible" functions
	
			return ctor;	// Function
		}
	
		/*=====
		declare.__DeclareCreatedObject = {
			// summary:
			//		dojo/_base/declare() returns a constructor `C`.   `new C()` returns an Object with the following
			//		methods, in addition to the methods and properties specified via the arguments passed to declare().
	
			inherited: function(name, args, newArgs){
				// summary:
				//		Calls a super method.
				// name: String?
				//		The optional method name. Should be the same as the caller's
				//		name. Usually "name" is specified in complex dynamic cases, when
				//		the calling method was dynamically added, undecorated by
				//		declare(), and it cannot be determined.
				// args: Arguments
				//		The caller supply this argument, which should be the original
				//		"arguments".
				// newArgs: Object?
				//		If "true", the found function will be returned without
				//		executing it.
				//		If Array, it will be used to call a super method. Otherwise
				//		"args" will be used.
				// returns:
				//		Whatever is returned by a super method, or a super method itself,
				//		if "true" was specified as newArgs.
				// description:
				//		This method is used inside method of classes produced with
				//		declare() to call a super method (next in the chain). It is
				//		used for manually controlled chaining. Consider using the regular
				//		chaining, because it is faster. Use "this.inherited()" only in
				//		complex cases.
				//
				//		This method cannot me called from automatically chained
				//		constructors including the case of a special (legacy)
				//		constructor chaining. It cannot be called from chained methods.
				//
				//		If "this.inherited()" cannot find the next-in-chain method, it
				//		does nothing and returns "undefined". The last method in chain
				//		can be a default method implemented in Object, which will be
				//		called last.
				//
				//		If "name" is specified, it is assumed that the method that
				//		received "args" is the parent method for this call. It is looked
				//		up in the chain list and if it is found the next-in-chain method
				//		is called. If it is not found, the first-in-chain method is
				//		called.
				//
				//		If "name" is not specified, it will be derived from the calling
				//		method (using a methoid property "nom").
				//
				// example:
				//	|	var B = declare(A, {
				//	|		method1: function(a, b, c){
				//	|			this.inherited(arguments);
				//	|		},
				//	|		method2: function(a, b){
				//	|			return this.inherited(arguments, [a + b]);
				//	|		}
				//	|	});
				//	|	// next method is not in the chain list because it is added
				//	|	// manually after the class was created.
				//	|	B.prototype.method3 = function(){
				//	|		console.log("This is a dynamically-added method.");
				//	|		this.inherited("method3", arguments);
				//	|	};
				// example:
				//	|	var B = declare(A, {
				//	|		method: function(a, b){
				//	|			var super = this.inherited(arguments, true);
				//	|			// ...
				//	|			if(!super){
				//	|				console.log("there is no super method");
				//	|				return 0;
				//	|			}
				//	|			return super.apply(this, arguments);
				//	|		}
				//	|	});
				return	{};	// Object
			},
	
			getInherited: function(name, args){
				// summary:
				//		Returns a super method.
				// name: String?
				//		The optional method name. Should be the same as the caller's
				//		name. Usually "name" is specified in complex dynamic cases, when
				//		the calling method was dynamically added, undecorated by
				//		declare(), and it cannot be determined.
				// args: Arguments
				//		The caller supply this argument, which should be the original
				//		"arguments".
				// returns:
				//		Returns a super method (Function) or "undefined".
				// description:
				//		This method is a convenience method for "this.inherited()".
				//		It uses the same algorithm but instead of executing a super
				//		method, it returns it, or "undefined" if not found.
				//
				// example:
				//	|	var B = declare(A, {
				//	|		method: function(a, b){
				//	|			var super = this.getInherited(arguments);
				//	|			// ...
				//	|			if(!super){
				//	|				console.log("there is no super method");
				//	|				return 0;
				//	|			}
				//	|			return super.apply(this, arguments);
				//	|		}
				//	|	});
				return	{};	// Object
			},
	
			isInstanceOf: function(cls){
				// summary:
				//		Checks the inheritance chain to see if it is inherited from this
				//		class.
				// cls: Function
				//		Class constructor.
				// returns:
				//		"true", if this object is inherited from this class, "false"
				//		otherwise.
				// description:
				//		This method is used with instances of classes produced with
				//		declare() to determine of they support a certain interface or
				//		not. It models "instanceof" operator.
				//
				// example:
				//	|	var A = declare(null, {
				//	|		// constructor, properties, and methods go here
				//	|		// ...
				//	|	});
				//	|	var B = declare(null, {
				//	|		// constructor, properties, and methods go here
				//	|		// ...
				//	|	});
				//	|	var C = declare([A, B], {
				//	|		// constructor, properties, and methods go here
				//	|		// ...
				//	|	});
				//	|	var D = declare(A, {
				//	|		// constructor, properties, and methods go here
				//	|		// ...
				//	|	});
				//	|
				//	|	var a = new A(), b = new B(), c = new C(), d = new D();
				//	|
				//	|	console.log(a.isInstanceOf(A)); // true
				//	|	console.log(b.isInstanceOf(A)); // false
				//	|	console.log(c.isInstanceOf(A)); // true
				//	|	console.log(d.isInstanceOf(A)); // true
				//	|
				//	|	console.log(a.isInstanceOf(B)); // false
				//	|	console.log(b.isInstanceOf(B)); // true
				//	|	console.log(c.isInstanceOf(B)); // true
				//	|	console.log(d.isInstanceOf(B)); // false
				//	|
				//	|	console.log(a.isInstanceOf(C)); // false
				//	|	console.log(b.isInstanceOf(C)); // false
				//	|	console.log(c.isInstanceOf(C)); // true
				//	|	console.log(d.isInstanceOf(C)); // false
				//	|
				//	|	console.log(a.isInstanceOf(D)); // false
				//	|	console.log(b.isInstanceOf(D)); // false
				//	|	console.log(c.isInstanceOf(D)); // false
				//	|	console.log(d.isInstanceOf(D)); // true
				return	{};	// Object
			},
	
			extend: function(source){
				// summary:
				//		Adds all properties and methods of source to constructor's
				//		prototype, making them available to all instances created with
				//		constructor. This method is specific to constructors created with
				//		declare().
				// source: Object
				//		Source object which properties are going to be copied to the
				//		constructor's prototype.
				// description:
				//		Adds source properties to the constructor's prototype. It can
				//		override existing properties.
				//
				//		This method is similar to dojo.extend function, but it is specific
				//		to constructors produced by declare(). It is implemented
				//		using dojo.safeMixin, and it skips a constructor property,
				//		and properly decorates copied functions.
				//
				// example:
				//	|	var A = declare(null, {
				//	|		m1: function(){},
				//	|		s1: "Popokatepetl"
				//	|	});
				//	|	A.extend({
				//	|		m1: function(){},
				//	|		m2: function(){},
				//	|		f1: true,
				//	|		d1: 42
				//	|	});
			},
	
			createSubclass: function(mixins, props){
				// summary:
				//		Create a subclass of the declared class from a list of base classes.
				// mixins: Function[]
				//		Specifies a list of bases (the left-most one is the most deepest
				//		base).
				// props: Object?
				//		An optional object whose properties are copied to the created prototype.
				// returns: dojo/_base/declare.__DeclareCreatedObject
				//		New constructor function.
				// description:
				//		Create a constructor using a compact notation for inheritance and
				//		prototype extension.
				//
				//		Mixin ancestors provide a type of multiple inheritance.
				//		Prototypes of mixin ancestors are copied to the new class:
				//		changes to mixin prototypes will not affect classes to which
				//		they have been mixed in.
				//
				// example:
				//	|	var A = declare(null, {
				//	|		m1: function(){},
				//	|		s1: "bar"
				//	|	});
				//	|	var B = declare(null, {
				//	|		m2: function(){},
				//	|		s2: "foo"
				//	|	});
				//	|	var C = declare(null, {
				//	|	});
				//	|	var D1 = A.createSubclass([B, C], {
				//	|		m1: function(){},
				//	|		d1: 42
				//	|	});
				//	|	var d1 = new D1();
				//	|
				//	|	// this is equivalent to:
				//	|	var D2 = declare([A, B, C], {
				//	|		m1: function(){},
				//	|		d1: 42
				//	|	});
				//	|	var d2 = new D2();
			}
		};
		=====*/
	
		// For back-compat, remove for 2.0
		dojo.safeMixin = declare.safeMixin = safeMixin;
		dojo.declare = declare;
	
		return declare;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(8),
		__webpack_require__(11),
		__webpack_require__(27),
		__webpack_require__(18),
		__webpack_require__(4),
		__webpack_require__(29),
		__webpack_require__(30),
		__webpack_require__(25)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, lang, domConstruct, domClass, listen, has, List, miscUtil) {
		function appendIfNode(parent, subNode) {
			if (subNode && subNode.nodeType) {
				parent.appendChild(subNode);
			}
		}
	
		function replaceInvalidChars(str) {
			// Replaces invalid characters for a CSS identifier with hyphen,
			// as dgrid does for field names / column IDs when adding classes.
			return miscUtil.escapeCssIdentifier(str, '-');
		}
	
		var Grid = declare(List, {
			columns: null,
	
			// hasNeutralSort: Boolean
			//		Determines behavior of toggling sort on the same column.
			//		If false, sort toggles between ascending and descending and cannot be
			//		reset to neutral without sorting another column.
			//		If true, sort toggles between ascending, descending, and neutral.
			hasNeutralSort: false,
	
			// cellNavigation: Boolean
			//		This indicates that focus is at the cell level. This may be set to false to cause
			//		focus to be at the row level, which is useful if you want only want row-level
			//		navigation.
			cellNavigation: true,
	
			tabableHeader: true,
			showHeader: true,
			column: function (target) {
				// summary:
				//		Get the column object by node, or event, or a columnId
				if (typeof target !== 'object') {
					return this.columns[target];
				}
				else {
					return this.cell(target).column;
				}
			},
			listType: 'grid',
			cell: function (target, columnId) {
				// summary:
				//		Get the cell object by node, or event, id, plus a columnId
	
				if (target.column && target.element) {
					return target;
				}
	
				if (target.target && target.target.nodeType) {
					// event
					target = target.target;
				}
				var element;
				if (target.nodeType) {
					do {
						if (this._rowIdToObject[target.id]) {
							break;
						}
						var colId = target.columnId;
						if (colId) {
							columnId = colId;
							element = target;
							break;
						}
						target = target.parentNode;
					} while (target && target !== this.domNode);
				}
				if (!element && typeof columnId !== 'undefined') {
					var row = this.row(target),
						rowElement = row && row.element;
					if (rowElement) {
						var elements = rowElement.getElementsByTagName('td');
						for (var i = 0; i < elements.length; i++) {
							if (elements[i].columnId === columnId) {
								element = elements[i];
								break;
							}
						}
					}
				}
				if (target != null) {
					return {
						row: row || this.row(target),
						column: columnId && this.column(columnId),
						element: element
					};
				}
			},
	
			createRowCells: function (tag, createCell, subRows, item, options) {
				// summary:
				//		Generates the grid for each row (used by renderHeader and and renderRow)
				var row = domConstruct.create('table', {
						className: 'dgrid-row-table',
						role: 'presentation'
					}),
					// IE < 9 needs an explicit tbody; other browsers do not
					tbody = (has('ie') < 9) ? domConstruct.create('tbody', null, row) : row,
					tr,
					si, sl, i, l, // iterators
					subRow, column, id, extraClasses, className,
					cell, colSpan, rowSpan; // used inside loops
	
				// Allow specification of custom/specific subRows, falling back to
				// those defined on the instance.
				subRows = subRows || this.subRows;
	
				for (si = 0, sl = subRows.length; si < sl; si++) {
					subRow = subRows[si];
					// for single-subrow cases in modern browsers, TR can be skipped
					// http://jsperf.com/table-without-trs
					tr = domConstruct.create('tr', null, tbody);
					if (subRow.className) {
						tr.className = subRow.className;
					}
	
					for (i = 0, l = subRow.length; i < l; i++) {
						// iterate through the columns
						column = subRow[i];
						id = column.id;
	
						extraClasses = column.field ?
							' field-' + replaceInvalidChars(column.field) :
							'';
						className = typeof column.className === 'function' ?
							column.className(item) : column.className;
						if (className) {
							extraClasses += ' ' + className;
						}
	
						cell = domConstruct.create(tag, {
							className: 'dgrid-cell' +
								(id ? ' dgrid-column-' + replaceInvalidChars(id) : '') + extraClasses,
							role: tag === 'th' ? 'columnheader' : 'gridcell'
						});
						cell.columnId = id;
						colSpan = column.colSpan;
						if (colSpan) {
							cell.colSpan = colSpan;
						}
						rowSpan = column.rowSpan;
						if (rowSpan) {
							cell.rowSpan = rowSpan;
						}
						createCell(cell, column, item, options);
						// add the td to the tr at the end for better performance
						tr.appendChild(cell);
					}
				}
				return row;
			},
	
			_createBodyRowCell: function (cellElement, column, item, options) {
				var cellData = item;
	
				// Support get function or field property (similar to DataGrid)
				if (column.get) {
					cellData = column.get(item);
				}
				else if ('field' in column && column.field !== '_item') {
					cellData = item[column.field];
				}
	
				if (column.renderCell) {
					// A column can provide a renderCell method to do its own DOM manipulation,
					// event handling, etc.
					appendIfNode(cellElement, column.renderCell(item, cellData, cellElement, options));
				}
				else {
					this._defaultRenderCell.call(column, item, cellData, cellElement, options);
				}
			},
	
			_createHeaderRowCell: function (cellElement, column) {
				var contentNode = column.headerNode = cellElement;
				var field = column.field;
				if (field) {
					cellElement.field = field;
				}
				// allow for custom header content manipulation
				if (column.renderHeaderCell) {
					appendIfNode(contentNode, column.renderHeaderCell(contentNode));
				}
				else if ('label' in column || column.field) {
					contentNode.appendChild(document.createTextNode(
						'label' in column ? column.label : column.field));
				}
				if (column.sortable !== false && field && field !== '_item') {
					cellElement.sortable = true;
					cellElement.className += ' dgrid-sortable';
				}
			},
	
			left: function (cell, steps) {
				if (!cell.element) {
					cell = this.cell(cell);
				}
				return this.cell(this._move(cell, -(steps || 1), 'dgrid-cell'));
			},
			right: function (cell, steps) {
				if (!cell.element) {
					cell = this.cell(cell);
				}
				return this.cell(this._move(cell, steps || 1, 'dgrid-cell'));
			},
	
			_defaultRenderCell: function (object, value, td) {
				// summary:
				//		Default renderCell implementation.
				//		NOTE: Called in context of column definition object.
				// object: Object
				//		The data item for the row currently being rendered
				// value: Mixed
				//		The value of the field applicable to the current cell
				// td: DOMNode
				//		The cell element representing the current item/field
				// options: Object?
				//		Any additional options passed through from renderRow
	
				if (this.formatter) {
					// Support formatter, with or without formatterScope
					var formatter = this.formatter,
						formatterScope = this.grid.formatterScope;
					td.innerHTML = typeof formatter === 'string' && formatterScope ?
						formatterScope[formatter](value, object) : this.formatter(value, object);
				}
				else if (value != null) {
					td.appendChild(document.createTextNode(value));
				}
			},
	
			renderRow: function (item, options) {
				var row = this.createRowCells('td', lang.hitch(this, '_createBodyRowCell'),
					options && options.subRows, item, options);
	
				// row gets a wrapper div for a couple reasons:
				// 1. So that one can set a fixed height on rows (heights can't be set on <table>'s AFAICT)
				// 2. So that outline style can be set on a row when it is focused,
				// and Safari's outline style is broken on <table>
				var div = domConstruct.create('div', { role: 'row' });
				div.appendChild(row);
				return div;
			},
	
			renderHeader: function () {
				// summary:
				//		Setup the headers for the grid
				var grid = this,
					headerNode = this.headerNode;
	
				headerNode.setAttribute('role', 'row');
	
				// clear out existing header in case we're resetting
				domConstruct.empty(headerNode);
	
				var row = this.createRowCells('th', lang.hitch(this, '_createHeaderRowCell'),
					this.subRows && this.subRows.headerRows);
				this._rowIdToObject[row.id = this.id + '-header'] = this.columns;
				headerNode.appendChild(row);
	
				// If the columns are sortable, re-sort on clicks.
				// Use a separate listener property to be managed by renderHeader in case
				// of subsequent calls.
				if (this._sortListener) {
					this._sortListener.remove();
				}
				this._sortListener = listen(row, 'click,keydown', function (event) {
					// respond to click, space keypress, or enter keypress
					if (event.type === 'click' || event.keyCode === 32 ||
							(!has('opera') && event.keyCode === 13)) {
						var target = event.target;
						var field;
						var sort;
						var newSort;
						var eventObj;
	
						do {
							if (target.sortable) {
								field = target.field || target.columnId;
								sort = grid.sort[0];
								if (!grid.hasNeutralSort || !sort || sort.property !== field || !sort.descending) {
									// If the user toggled the same column as the active sort,
									// reverse sort direction
									newSort = [{
										property: field,
										descending: sort && sort.property === field &&
											!sort.descending
									}];
								}
								else {
									// If the grid allows neutral sort and user toggled an already-descending column,
									// clear sort entirely
									newSort = [];
								}
	
								// Emit an event with the new sort
								eventObj = {
									bubbles: true,
									cancelable: true,
									grid: grid,
									parentType: event.type,
									sort: newSort
								};
	
								if (listen.emit(event.target, 'dgrid-sort', eventObj)) {
									// Stash node subject to DOM manipulations,
									// to be referenced then removed by sort()
									grid._sortNode = target;
									grid.set('sort', newSort);
								}
	
								break;
							}
						} while ((target = target.parentNode) && target !== headerNode);
					}
				});
			},
	
			resize: function () {
				// extension of List.resize to allow accounting for
				// column sizes larger than actual grid area
				var headerTableNode = this.headerNode.firstChild,
					contentNode = this.contentNode,
					width;
	
				this.inherited(arguments);
	
				// Force contentNode width to match up with header width.
				contentNode.style.width = ''; // reset first
				if (contentNode && headerTableNode) {
					if ((width = headerTableNode.offsetWidth) > contentNode.offsetWidth) {
						// update size of content node if necessary (to match size of rows)
						// (if headerTableNode can't be found, there isn't much we can do)
						contentNode.style.width = width + 'px';
					}
				}
			},
	
			destroy: function () {
				// Run _destroyColumns first to perform any column plugin tear-down logic.
				this._destroyColumns();
				if (this._sortListener) {
					this._sortListener.remove();
				}
	
				this.inherited(arguments);
			},
	
			_setSort: function () {
				// summary:
				//		Extension of List.js sort to update sort arrow in UI
	
				// Normalize sort first via inherited logic, then update the sort arrow
				this.inherited(arguments);
				this.updateSortArrow(this.sort);
			},
	
			_findSortArrowParent: function (field) {
				// summary:
				//		Method responsible for finding cell that sort arrow should be
				//		added under.  Called by updateSortArrow; separated for extensibility.
	
				var columns = this.columns;
				for (var i in columns) {
					var column = columns[i];
					if (column.field === field) {
						return column.headerNode;
					}
				}
			},
	
			updateSortArrow: function (sort, updateSort) {
				// summary:
				//		Method responsible for updating the placement of the arrow in the
				//		appropriate header cell.  Typically this should not be called (call
				//		set("sort", ...) when actually updating sort programmatically), but
				//		this method may be used by code which is customizing sort (e.g.
				//		by reacting to the dgrid-sort event, canceling it, then
				//		performing logic and calling this manually).
				// sort: Array
				//		Standard sort parameter - array of object(s) containing property name
				//		and optional descending flag
				// updateSort: Boolean?
				//		If true, will update this.sort based on the passed sort array
				//		(i.e. to keep it in sync when custom logic is otherwise preventing
				//		it from being updated); defaults to false
	
				// Clean up UI from any previous sort
				if (this._lastSortedArrow) {
					// Remove the sort classes from the parent node
					domClass.remove(this._lastSortedArrow.parentNode, 'dgrid-sort-up dgrid-sort-down');
					// Destroy the lastSortedArrow node
					domConstruct.destroy(this._lastSortedArrow);
					delete this._lastSortedArrow;
				}
	
				if (updateSort) {
					this.sort = sort;
				}
				if (!sort[0]) {
					return; // Nothing to do if no sort is specified
				}
	
				var prop = sort[0].property,
					desc = sort[0].descending,
					// if invoked from header click, target is stashed in _sortNode
					target = this._sortNode || this._findSortArrowParent(prop),
					arrowNode;
	
				delete this._sortNode;
	
				// Skip this logic if field being sorted isn't actually displayed
				if (target) {
					target = target.contents || target;
					// Place sort arrow under clicked node, and add up/down sort class
					arrowNode = this._lastSortedArrow = domConstruct.create('div', {
						className: 'dgrid-sort-arrow ui-icon',
						innerHTML: '&nbsp;',
						role: 'presentation'
					}, target, 'first');
					domClass.add(target, 'dgrid-sort-' + (desc ? 'down' : 'up'));
					// Call resize in case relocation of sort arrow caused any height changes
					this.resize();
				}
			},
	
			styleColumn: function (colId, css) {
				// summary:
				//		Dynamically creates a stylesheet rule to alter a column's style.
	
				return this.addCssRule('#' + miscUtil.escapeCssIdentifier(this.domNode.id) +
					' .dgrid-column-' + replaceInvalidChars(colId), css);
			},
	
			/*=====
			_configColumn: function (column, rowColumns, prefix) {
				// summary:
				//		Method called when normalizing base configuration of a single
				//		column.  Can be used as an extension point for behavior requiring
				//		access to columns when a new configuration is applied.
			},=====*/
	
			_configColumns: function (prefix, rowColumns) {
				// configure the current column
				var subRow = [],
					isArray = rowColumns instanceof Array;
	
				function configColumn(column, columnId) {
					if (typeof column === 'string') {
						rowColumns[columnId] = column = { label: column };
					}
					if (!isArray && !column.field) {
						column.field = columnId;
					}
					columnId = column.id = column.id || (isNaN(columnId) ? columnId : (prefix + columnId));
					// allow further base configuration in subclasses
					if (this._configColumn) {
						this._configColumn(column, rowColumns, prefix);
						// Allow the subclasses to modify the column id.
						columnId = column.id;
					}
					if (isArray) {
						this.columns[columnId] = column;
					}
	
					// add grid reference to each column object for potential use by plugins
					column.grid = this;
					subRow.push(column); // make sure it can be iterated on
				}
	
				miscUtil.each(rowColumns, configColumn, this);
				return isArray ? rowColumns : subRow;
			},
	
			_destroyColumns: function () {
				// summary:
				//		Extension point for column-related cleanup.  This is called
				//		immediately before configuring a new column structure,
				//		and when the grid is destroyed.
	
				// First remove rows (since they'll be refreshed after we're done),
				// so that anything temporarily extending removeRow can run.
				// (cleanup will end up running again, but with nothing to iterate.)
				this.cleanup();
			},
	
			configStructure: function () {
				// configure the columns and subRows
				var subRows = this.subRows,
					columns = this._columns = this.columns;
	
				// Reset this.columns unless it was already passed in as an object
				this.columns = !columns || columns instanceof Array ? {} : columns;
	
				if (subRows) {
					// Process subrows, which will in turn populate the this.columns object
					for (var i = 0; i < subRows.length; i++) {
						subRows[i] = this._configColumns(i + '-', subRows[i]);
					}
				}
				else {
					this.subRows = [this._configColumns('', columns)];
				}
			},
	
			_getColumns: function () {
				// _columns preserves what was passed to set("columns"), but if subRows
				// was set instead, columns contains the "object-ified" version, which
				// was always accessible in the past, so maintain that accessibility going
				// forward.
				return this._columns || this.columns;
			},
			_setColumns: function (columns) {
				this._destroyColumns();
				// reset instance variables
				this.subRows = null;
				this.columns = columns;
				// re-run logic
				this._updateColumns();
			},
	
			_setSubRows: function (subrows) {
				this._destroyColumns();
				this.subRows = subrows;
				this._updateColumns();
			},
	
			_updateColumns: function () {
				// summary:
				//		Called when columns, subRows, or columnSets are reset
	
				this.configStructure();
				this.renderHeader();
	
				this.refresh();
				// re-render last collection if present
				this._lastCollection && this.renderArray(this._lastCollection);
	
				// After re-rendering the header, re-apply the sort arrow if needed.
				if (this._started) {
					if (this.sort.length) {
						this._lastSortedArrow = null;
						this.updateSortArrow(this.sort);
					} else {
						// Only call resize directly if we didn't call updateSortArrow,
						// since that calls resize itself when it updates.
						this.resize();
					}
				}
			}
		});
	
		Grid.appendIfNode = appendIfNode;
	
		return Grid;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8), __webpack_require__(28), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang, array, dom){
		// module:
		//		dojo/dom-class
	
		var className = "className";
	
		/* Part I of classList-based implementation is preserved here for posterity
		var classList = "classList";
		has.add("dom-classList", function(){
			return classList in document.createElement("p");
		});
		*/
	
		// =============================
		// (CSS) Class Functions
		// =============================
	
		var cls, // exports object
			spaces = /\s+/, a1 = [""];
	
		function str2array(s){
			if(typeof s == "string" || s instanceof String){
				if(s && !spaces.test(s)){
					a1[0] = s;
					return a1;
				}
				var a = s.split(spaces);
				if(a.length && !a[0]){
					a.shift();
				}
				if(a.length && !a[a.length - 1]){
					a.pop();
				}
				return a;
			}
			// assumed to be an array
			if(!s){
				return [];
			}
			return array.filter(s, function(x){ return x; });
		}
	
		/* Part II of classList-based implementation is preserved here for posterity
		if(has("dom-classList")){
			// new classList version
			cls = {
				contains: function containsClass(node, classStr){
					var clslst = classStr && dom.byId(node)[classList];
					return clslst && clslst.contains(classStr); // Boolean
				},
	
				add: function addClass(node, classStr){
					node = dom.byId(node);
					classStr = str2array(classStr);
					for(var i = 0, len = classStr.length; i < len; ++i){
						node[classList].add(classStr[i]);
					}
				},
	
				remove: function removeClass(node, classStr){
					node = dom.byId(node);
					if(classStr === undefined){
						node[className] = "";
					}else{
						classStr = str2array(classStr);
						for(var i = 0, len = classStr.length; i < len; ++i){
							node[classList].remove(classStr[i]);
						}
					}
				},
	
				replace: function replaceClass(node, addClassStr, removeClassStr){
					node = dom.byId(node);
					if(removeClassStr === undefined){
						node[className] = "";
					}else{
						removeClassStr = str2array(removeClassStr);
						for(var i = 0, len = removeClassStr.length; i < len; ++i){
							node[classList].remove(removeClassStr[i]);
						}
					}
					addClassStr = str2array(addClassStr);
					for(i = 0, len = addClassStr.length; i < len; ++i){
						node[classList].add(addClassStr[i]);
					}
				},
	
				toggle: function toggleClass(node, classStr, condition){
					node = dom.byId(node);
					if(condition === undefined){
						classStr = str2array(classStr);
						for(var i = 0, len = classStr.length; i < len; ++i){
							node[classList].toggle(classStr[i]);
						}
					}else{
						cls[condition ? "add" : "remove"](node, classStr);
					}
					return condition;   // Boolean
				}
			}
		}
		*/
	
		// regular DOM version
		var fakeNode = {};  // for effective replacement
		cls = {
			// summary:
			//		This module defines the core dojo DOM class API.
	
			contains: function containsClass(/*DomNode|String*/ node, /*String*/ classStr){
				// summary:
				//		Returns whether or not the specified classes are a portion of the
				//		class list currently applied to the node.
				// node: String|DOMNode
				//		String ID or DomNode reference to check the class for.
				// classStr: String
				//		A string class name to look for.
				// example:
				//		Do something if a node with id="someNode" has class="aSillyClassName" present
				//	|	if(domClass.contains("someNode","aSillyClassName")){ ... }
	
				return ((" " + dom.byId(node)[className] + " ").indexOf(" " + classStr + " ") >= 0); // Boolean
			},
	
			add: function addClass(/*DomNode|String*/ node, /*String|Array*/ classStr){
				// summary:
				//		Adds the specified classes to the end of the class list on the
				//		passed node. Will not re-apply duplicate classes.
				//
				// node: String|DOMNode
				//		String ID or DomNode reference to add a class string too
				//
				// classStr: String|Array
				//		A String class name to add, or several space-separated class names,
				//		or an array of class names.
				//
				// example:
				//		Add a class to some node:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.add("someNode", "anewClass");
				//	|	});
				//
				// example:
				//		Add two classes at once:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.add("someNode", "firstClass secondClass");
				//	|	});
				//
				// example:
				//		Add two classes at once (using array):
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.add("someNode", ["firstClass", "secondClass"]);
				//	|	});
				//
				// example:
				//		Available in `dojo/NodeList` for multiple additions
				//	|	require(["dojo/query"], function(query){
				//	|		query("ul > li").addClass("firstLevel");
				//	|	});
	
				node = dom.byId(node);
				classStr = str2array(classStr);
				var cls = node[className], oldLen;
				cls = cls ? " " + cls + " " : " ";
				oldLen = cls.length;
				for(var i = 0, len = classStr.length, c; i < len; ++i){
					c = classStr[i];
					if(c && cls.indexOf(" " + c + " ") < 0){
						cls += c + " ";
					}
				}
				if(oldLen < cls.length){
					node[className] = cls.substr(1, cls.length - 2);
				}
			},
	
			remove: function removeClass(/*DomNode|String*/ node, /*String|Array?*/ classStr){
				// summary:
				//		Removes the specified classes from node. No `contains()`
				//		check is required.
				//
				// node: String|DOMNode
				//		String ID or DomNode reference to remove the class from.
				//
				// classStr: String|Array
				//		An optional String class name to remove, or several space-separated
				//		class names, or an array of class names. If omitted, all class names
				//		will be deleted.
				//
				// example:
				//		Remove a class from some node:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.remove("someNode", "firstClass");
				//	|	});
				//
				// example:
				//		Remove two classes from some node:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.remove("someNode", "firstClass secondClass");
				//	|	});
				//
				// example:
				//		Remove two classes from some node (using array):
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.remove("someNode", ["firstClass", "secondClass"]);
				//	|	});
				//
				// example:
				//		Remove all classes from some node:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.remove("someNode");
				//	|	});
				//
				// example:
				//		Available in `dojo/NodeList` for multiple removal
				//	|	require(["dojo/query"], function(query){
				//	|		query("ul > li").removeClass("foo");
				//	|	});
	
				node = dom.byId(node);
				var cls;
				if(classStr !== undefined){
					classStr = str2array(classStr);
					cls = " " + node[className] + " ";
					for(var i = 0, len = classStr.length; i < len; ++i){
						cls = cls.replace(" " + classStr[i] + " ", " ");
					}
					cls = lang.trim(cls);
				}else{
					cls = "";
				}
				if(node[className] != cls){ node[className] = cls; }
			},
	
			replace: function replaceClass(/*DomNode|String*/ node, /*String|Array*/ addClassStr, /*String|Array?*/ removeClassStr){
				// summary:
				//		Replaces one or more classes on a node if not present.
				//		Operates more quickly than calling domClass.remove and domClass.add
				//
				// node: String|DOMNode
				//		String ID or DomNode reference to remove the class from.
				//
				// addClassStr: String|Array
				//		A String class name to add, or several space-separated class names,
				//		or an array of class names.
				//
				// removeClassStr: String|Array?
				//		A String class name to remove, or several space-separated class names,
				//		or an array of class names.
				//
				// example:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.replace("someNode", "add1 add2", "remove1 remove2");
				//	|	});
				//
				// example:
				//	Replace all classes with addMe
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.replace("someNode", "addMe");
				//	|	});
				//
				// example:
				//	Available in `dojo/NodeList` for multiple toggles
				//	|	require(["dojo/query"], function(query){
				//	|		query(".findMe").replaceClass("addMe", "removeMe");
				//	|	});
	
				node = dom.byId(node);
				fakeNode[className] = node[className];
				cls.remove(fakeNode, removeClassStr);
				cls.add(fakeNode, addClassStr);
				if(node[className] !== fakeNode[className]){
					node[className] = fakeNode[className];
				}
			},
	
			toggle: function toggleClass(/*DomNode|String*/ node, /*String|Array*/ classStr, /*Boolean?*/ condition){
				// summary:
				//		Adds a class to node if not present, or removes if present.
				//		Pass a boolean condition if you want to explicitly add or remove.
				//		Returns the condition that was specified directly or indirectly.
				//
				// node: String|DOMNode
				//		String ID or DomNode reference to toggle a class string
				//
				// classStr: String|Array
				//		A String class name to toggle, or several space-separated class names,
				//		or an array of class names.
				//
				// condition:
				//		If passed, true means to add the class, false means to remove.
				//		Otherwise domClass.contains(node, classStr) is used to detect the class presence.
				//
				// example:
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.toggle("someNode", "hovered");
				//	|	});
				//
				// example:
				//		Forcefully add a class
				//	|	require(["dojo/dom-class"], function(domClass){
				//	|		domClass.toggle("someNode", "hovered", true);
				//	|	});
				//
				// example:
				//		Available in `dojo/NodeList` for multiple toggles
				//	|	require(["dojo/query"], function(query){
				//	|		query(".toggleMe").toggleClass("toggleMe");
				//	|	});
	
				node = dom.byId(node);
				if(condition === undefined){
					classStr = str2array(classStr);
					for(var i = 0, len = classStr.length, c; i < len; ++i){
						c = classStr[i];
						cls[cls.contains(node, c) ? "remove" : "add"](node, c);
					}
				}else{
					cls[condition ? "add" : "remove"](node, classStr);
				}
				return condition;   // Boolean
			}
		};
	
		return cls;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(11),
		__webpack_require__(27),
		__webpack_require__(18),
		__webpack_require__(4),
		__webpack_require__(30),
		__webpack_require__(25)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, domConstruct, domClass, listen, has, miscUtil) {
		// Add user agent/feature CSS classes needed for structural CSS
		var featureClasses = [];
		if (has('mozilla')) {
			featureClasses.push('has-mozilla');
		}
		if (has('touch')) {
			featureClasses.push('has-touch');
		}
		domClass.add(document.documentElement, featureClasses);
	
		// Add a feature test for pointer (only Dojo 1.10 has pointer-events and MSPointer tests)
		has.add('pointer', function (global) {
			return 'PointerEvent' in global ? 'pointer' :
				'MSPointerEvent' in global ? 'MSPointer' : false;
		});
	
		var oddClass = 'dgrid-row-odd',
			evenClass = 'dgrid-row-even',
			scrollbarWidth, scrollbarHeight;
	
		function byId(id) {
			return document.getElementById(id);
		}
	
		function cleanupTestElement(element) {
			element.className = '';
			if (element.parentNode) {
				document.body.removeChild(element);
			}
		}
	
		function getScrollbarSize(element, dimension) {
			// Used by has tests for scrollbar width/height
			element.className = 'dgrid-scrollbar-measure';
			document.body.appendChild(element);
			var size = element['offset' + dimension] - element['client' + dimension];
			cleanupTestElement(element);
			return size;
		}
		has.add('dom-scrollbar-width', function (global, doc, element) {
			return getScrollbarSize(element, 'Width');
		});
		has.add('dom-scrollbar-height', function (global, doc, element) {
			return getScrollbarSize(element, 'Height');
		});
	
		has.add('dom-rtl-scrollbar-left', function (global, doc, element) {
			var div = document.createElement('div'),
				isLeft;
	
			element.className = 'dgrid-scrollbar-measure';
			element.setAttribute('dir', 'rtl');
			element.appendChild(div);
			document.body.appendChild(element);
	
			// position: absolute makes modern IE and Edge always report child's offsetLeft as 0,
			// but other browsers factor in the position of the scrollbar if it is to the left.
			// All versions of IE and Edge are known to move the scrollbar to the left side for rtl.
			isLeft = !!has('ie') || !!has('trident') || /\bEdge\//.test(navigator.userAgent) ||
				div.offsetLeft >= has('dom-scrollbar-width');
			cleanupTestElement(element);
			domConstruct.destroy(div);
			element.removeAttribute('dir');
			return isLeft;
		});
	
		// var and function for autogenerating ID when one isn't provided
		var autoId = 0;
		function generateId() {
			return List.autoIdPrefix + autoId++;
		}
	
		// common functions for class and className setters/getters
		// (these are run in instance context)
		function setClass(cls) {
			domClass.replace(this.domNode, cls, this._class || '');
	
			// Store for later retrieval/removal.
			this._class = cls;
		}
		function getClass() {
			return this._class;
		}
	
		// window resize event handler, run in context of List instance
		var winResizeHandler = function () {
			if (this._started) {
				this.resize();
			}
		};
	
		var List = declare(null, {
			tabableHeader: false,
	
			// showHeader: Boolean
			//		Whether to render header (sub)rows.
			showHeader: false,
	
			// showFooter: Boolean
			//		Whether to render footer area.  Extensions which display content
			//		in the footer area should set this to true.
			showFooter: false,
	
			// maintainOddEven: Boolean
			//		Whether to maintain the odd/even classes when new rows are inserted.
			//		This can be disabled to improve insertion performance if odd/even styling is not employed.
			maintainOddEven: true,
	
			// cleanAddedRules: Boolean
			//		Whether to track rules added via the addCssRule method to be removed
			//		when the list is destroyed.  Note this is effective at the time of
			//		the call to addCssRule, not at the time of destruction.
			cleanAddedRules: true,
	
			// addUiClasses: Boolean
			//		Whether to add jQuery UI classes to various elements in dgrid's DOM.
			addUiClasses: true,
	
			// highlightDuration: Integer
			//		The amount of time (in milliseconds) that a row should remain
			//		highlighted after it has been updated.
			highlightDuration: 250,
	
			postscript: function (params, srcNodeRef) {
				// perform setup and invoke create in postScript to allow descendants to
				// perform logic before create/postCreate happen (a la dijit/_WidgetBase)
				var grid = this;
	
				(this._Row = function (id, object, element) {
					this.id = id;
					this.data = object;
					this.element = element;
				}).prototype.remove = function () {
					grid.removeRow(this.element);
				};
	
				if (srcNodeRef) {
					// normalize srcNodeRef and store on instance during create process.
					// Doing this in postscript is a bit earlier than dijit would do it,
					// but allows subclasses to access it pre-normalized during create.
					this.srcNodeRef = srcNodeRef =
						srcNodeRef.nodeType ? srcNodeRef : byId(srcNodeRef);
				}
				this.create(params, srcNodeRef);
			},
			listType: 'list',
	
			create: function (params, srcNodeRef) {
				var domNode = this.domNode = srcNodeRef || document.createElement('div'),
					cls;
	
				if (params) {
					this.params = params;
					declare.safeMixin(this, params);
	
					// Check for initial class or className in params or on domNode
					cls = params['class'] || params.className || domNode.className;
				}
	
				// ensure arrays and hashes are initialized
				this.sort = this.sort || [];
				this._listeners = [];
				this._rowIdToObject = {};
	
				this.postMixInProperties && this.postMixInProperties();
	
				// Apply id to widget and domNode,
				// from incoming node, widget params, or autogenerated.
				this.id = domNode.id = domNode.id || this.id || generateId();
	
				// Perform initial rendering, and apply classes if any were specified.
				this.buildRendering();
				if (cls) {
					setClass.call(this, cls);
				}
	
				this.postCreate();
	
				// remove srcNodeRef instance property post-create
				delete this.srcNodeRef;
				// to preserve "it just works" behavior, call startup if we're visible
				if (this.domNode.offsetHeight) {
					this.startup();
				}
			},
			buildRendering: function () {
				var domNode = this.domNode,
					addUiClasses = this.addUiClasses,
					self = this,
					headerNode,
					bodyNode,
					footerNode,
					isRTL;
	
				// Detect RTL on html/body nodes; taken from dojo/dom-geometry
				isRTL = this.isRTL = (document.body.dir || document.documentElement.dir ||
					document.body.style.direction).toLowerCase() === 'rtl';
	
				// Clear out className (any pre-applied classes will be re-applied via the
				// class / className setter), then apply standard classes/attributes
				domNode.className = '';
	
				domNode.setAttribute('role', 'grid');
				domClass.add(domNode, 'dgrid dgrid-' + this.listType +
					(addUiClasses ? ' ui-widget' : ''));
	
				// Place header node (initially hidden if showHeader is false).
				headerNode = this.headerNode = domConstruct.create('div', {
					className: 'dgrid-header dgrid-header-row' + (addUiClasses ? ' ui-widget-header' : '') +
						(this.showHeader ? '' : ' dgrid-header-hidden')
				}, domNode);
	
				bodyNode = this.bodyNode = domConstruct.create('div', {
					className: 'dgrid-scroller'
				}, domNode);
	
				// Firefox 4+ adds overflow: auto elements to the tab index by default;
				// force them to not be tabbable, but restrict this to Firefox,
				// since it breaks accessibility support in other browsers
				if (has('ff')) {
					bodyNode.tabIndex = -1;
				}
	
				this.headerScrollNode = domConstruct.create('div', {
					className: 'dgrid-header dgrid-header-scroll dgrid-scrollbar-width' +
						(addUiClasses ? ' ui-widget-header' : '')
				}, domNode);
	
				// Place footer node (initially hidden if showFooter is false).
				footerNode = this.footerNode = domConstruct.create('div', {
					className: 'dgrid-footer' + (this.showFooter ? '' : ' dgrid-footer-hidden')
				}, domNode);
	
				if (isRTL) {
					domNode.className += ' dgrid-rtl' +
						(has('dom-rtl-scrollbar-left') ? ' dgrid-rtl-swap' : '');
				}
	
				listen(bodyNode, 'scroll', function (event) {
					if (self.showHeader) {
						// keep the header aligned with the body
						headerNode.scrollLeft = event.scrollLeft || bodyNode.scrollLeft;
					}
					// re-fire, since browsers are not consistent about propagation here
					event.stopPropagation();
					listen.emit(domNode, 'scroll', {scrollTarget: bodyNode});
				});
				this.configStructure();
				this.renderHeader();
	
				this.contentNode = this.touchNode = domConstruct.create('div', {
					className: 'dgrid-content' + (addUiClasses ? ' ui-widget-content' : '')
				}, this.bodyNode);
	
				// add window resize handler, with reference for later removal if needed
				this._listeners.push(this._resizeHandle = listen(window, 'resize',
					miscUtil.throttleDelayed(winResizeHandler, this)));
			},
	
			postCreate: function () {
			},
	
			startup: function () {
				// summary:
				//		Called automatically after postCreate if the component is already
				//		visible; otherwise, should be called manually once placed.
	
				if (this._started) {
					return;
				}
				this.inherited(arguments);
				this._started = true;
				this.resize();
				// apply sort (and refresh) now that we're ready to render
				this.set('sort', this.sort);
			},
	
			configStructure: function () {
				// does nothing in List, this is more of a hook for the Grid
			},
			resize: function () {
				var bodyNode = this.bodyNode,
					headerNode = this.headerNode,
					footerNode = this.footerNode,
					headerHeight = headerNode.offsetHeight,
					footerHeight = this.showFooter ? footerNode.offsetHeight : 0;
	
				this.headerScrollNode.style.height = bodyNode.style.marginTop = headerHeight + 'px';
				bodyNode.style.marginBottom = footerHeight + 'px';
	
				if (!scrollbarWidth) {
					// Measure the browser's scrollbar width using a DIV we'll delete right away
					scrollbarWidth = has('dom-scrollbar-width');
					scrollbarHeight = has('dom-scrollbar-height');
	
					// Avoid issues with certain widgets inside in IE7, and
					// ColumnSet scroll issues with all supported IE versions
					if (has('ie')) {
						scrollbarWidth++;
						scrollbarHeight++;
					}
	
					// add rules that can be used where scrollbar width/height is needed
					miscUtil.addCssRule('.dgrid-scrollbar-width', 'width: ' + scrollbarWidth + 'px');
					miscUtil.addCssRule('.dgrid-scrollbar-height', 'height: ' + scrollbarHeight + 'px');
	
					if (scrollbarWidth !== 17) {
						// for modern browsers, we can perform a one-time operation which adds
						// a rule to account for scrollbar width in all grid headers.
						miscUtil.addCssRule('.dgrid-header-row', 'right: ' + scrollbarWidth + 'px');
						// add another for RTL grids
						miscUtil.addCssRule('.dgrid-rtl-swap .dgrid-header-row', 'left: ' + scrollbarWidth + 'px');
					}
				}
			},
	
			addCssRule: function (selector, css) {
				// summary:
				//		Version of util/misc.addCssRule which tracks added rules and removes
				//		them when the List is destroyed.
	
				var rule = miscUtil.addCssRule(selector, css);
				if (this.cleanAddedRules) {
					// Although this isn't a listener, it shares the same remove contract
					this._listeners.push(rule);
				}
				return rule;
			},
	
			on: function (eventType, listener) {
				// delegate events to the domNode
				var signal = listen(this.domNode, eventType, listener);
				if (!has('dom-addeventlistener')) {
					this._listeners.push(signal);
				}
				return signal;
			},
	
			cleanup: function () {
				// summary:
				//		Clears out all rows currently in the list.
	
				var i;
				for (i in this._rowIdToObject) {
					if (this._rowIdToObject[i] !== this.columns) {
						var rowElement = byId(i);
						if (rowElement) {
							this.removeRow(rowElement, true);
						}
					}
				}
			},
			destroy: function () {
				// summary:
				//		Destroys this grid
	
				// Remove any event listeners and other such removables
				if (this._listeners) { // Guard against accidental subsequent calls to destroy
					for (var i = this._listeners.length; i--;) {
						this._listeners[i].remove();
					}
					this._listeners = null;
				}
	
				this._started = false;
				this.cleanup();
				// destroy DOM
				domConstruct.destroy(this.domNode);
			},
			refresh: function () {
				// summary:
				//		refreshes the contents of the grid
				this.cleanup();
				this._rowIdToObject = {};
				this._autoRowId = 0;
	
				// make sure all the content has been removed so it can be recreated
				this.contentNode.innerHTML = '';
				// Ensure scroll position always resets
				this.scrollTo({ x: 0, y: 0 });
			},
	
			highlightRow: function (rowElement, delay) {
				// summary:
				//		Highlights a row.  Used when updating rows due to store
				//		notifications, but potentially also useful in other cases.
				// rowElement: Object
				//		Row element (or object returned from the row method) to
				//		highlight.
				// delay: Number
				//		Number of milliseconds between adding and removing the
				//		ui-state-highlight class.
	
				var classes = 'dgrid-highlight' + (this.addUiClasses ? ' ui-state-highlight' : '');
	
				rowElement = rowElement.element || rowElement;
				domClass.add(rowElement, classes);
				setTimeout(function () {
					domClass.remove(rowElement, classes);
				}, delay || this.highlightDuration);
			},
	
			adjustRowIndices: function (firstRow) {
				// this traverses through rows to maintain odd/even classes on the rows when indexes shift;
				var next = firstRow;
				var rowIndex = next.rowIndex;
				if (rowIndex > -1) { // make sure we have a real number in case this is called on a non-row
					do {
						// Skip non-numeric, non-rows
						if (next.rowIndex > -1) {
							if (this.maintainOddEven) {
								if (domClass.contains(next, 'dgrid-row')) {
									domClass.replace(next, (rowIndex % 2 === 1 ? oddClass : evenClass),
										(rowIndex % 2 === 0 ? oddClass : evenClass));
								}
							}
							next.rowIndex = rowIndex++;
						}
					} while ((next = next.nextSibling) && next.rowIndex !== rowIndex);
				}
			},
			renderArray: function (results, beforeNode, options) {
				// summary:
				//		Renders an array of objects as rows, before the given node.
	
				options = options || {};
				var self = this,
					start = options.start || 0,
					rowsFragment = document.createDocumentFragment(),
					rows = [],
					container,
					i = 0,
					len = results.length;
	
				if (!beforeNode) {
					this._lastCollection = results;
				}
	
				// Insert a row for each item into the document fragment
				while (i < len) {
					rows[i] = this.insertRow(results[i], rowsFragment, null, start++, options);
					i++;
				}
	
				// Insert the document fragment into the appropriate position
				container = beforeNode ? beforeNode.parentNode : self.contentNode;
				if (container && container.parentNode &&
						(container !== self.contentNode || len)) {
					container.insertBefore(rowsFragment, beforeNode || null);
					if (len) {
						self.adjustRowIndices(rows[len - 1]);
					}
				}
	
				return rows;
			},
	
			renderHeader: function () {
				// no-op in a plain list
			},
	
			_autoRowId: 0,
			insertRow: function (object, parent, beforeNode, i, options) {
				// summary:
				//		Creates a single row in the grid.
	
				// Include parentId within row identifier if one was specified in options.
				// (This is used by tree to allow the same object to appear under
				// multiple parents.)
				var id = this.id + '-row-' + ((this.collection && this.collection.getIdentity) ?
						this.collection.getIdentity(object) : this._autoRowId++),
					row = byId(id),
					previousRow = row && row.previousSibling;
	
				if (row) {
					// If it existed elsewhere in the DOM, we will remove it, so we can recreate it
					if (row === beforeNode) {
						beforeNode = (beforeNode.connected || beforeNode).nextSibling;
					}
					this.removeRow(row, false, options);
				}
				row = this.renderRow(object, options);
				row.className = (row.className || '') + ' dgrid-row ' +
					(i % 2 === 1 ? oddClass : evenClass) +
					(this.addUiClasses ? ' ui-state-default' : '');
				// Get the row id for easy retrieval
				this._rowIdToObject[row.id = id] = object;
				parent.insertBefore(row, beforeNode || null);
	
				row.rowIndex = i;
				if (previousRow && previousRow.rowIndex !== (row.rowIndex - 1)) {
					// In this case, we are pulling the row from another location in the grid,
					// and we need to readjust the rowIndices from the point it was removed
					this.adjustRowIndices(previousRow);
				}
				return row;
			},
			renderRow: function (value) {
				// summary:
				//		Responsible for returning the DOM for a single row in the grid.
				// value: Mixed
				//		Value to render
				// options: Object?
				//		Optional object with additional options
	
				var div = document.createElement('div');
				div.appendChild(document.createTextNode(value));
				return div;
			},
			removeRow: function (rowElement, preserveDom) {
				// summary:
				//		Simply deletes the node in a plain List.
				//		Column plugins may aspect this to implement their own cleanup routines.
				// rowElement: Object|DOMNode
				//		Object or element representing the row to be removed.
				// preserveDom: Boolean?
				//		If true, the row element will not be removed from the DOM; this can
				//		be used by extensions/plugins in cases where the DOM will be
				//		massively cleaned up at a later point in time.
				// options: Object?
				//		May be specified with a `rows` property for the purpose of
				//		cleaning up collection tracking (used by `_StoreMixin`).
	
				rowElement = rowElement.element || rowElement;
				delete this._rowIdToObject[rowElement.id];
				if (!preserveDom) {
					domConstruct.destroy(rowElement);
				}
			},
	
			row: function (target) {
				// summary:
				//		Get the row object by id, object, node, or event
				var id;
	
				if (target instanceof this._Row) {
					return target; // No-op; already a row
				}
	
				if (target.target && target.target.nodeType) {
					// Event
					target = target.target;
				}
				if (target.nodeType) {
					// Row element, or child of a row element
					var object;
					do {
						var rowId = target.id;
						if ((object = this._rowIdToObject[rowId])) {
							return new this._Row(rowId.substring(this.id.length + 5), object, target);
						}
						target = target.parentNode;
					}while (target && target !== this.domNode);
					return;
				}
	
				if (typeof target === 'object') {
					// Assume target represents a collection item
					id = this.collection.getIdentity(target);
				}
				else {
					// Assume target is a row ID
					id = target;
					target = this._rowIdToObject[this.id + '-row-' + id];
				}
				return new this._Row(id, target, byId(this.id + '-row-' + id));
			},
			cell: function (target) {
				// this doesn't do much in a plain list
				return {
					row: this.row(target)
				};
			},
	
			_move: function (item, steps, targetClass, visible) {
				var nextSibling, current, element;
				// Start at the element indicated by the provided row or cell object.
				element = current = item.element;
				steps = steps || 1;
	
				do {
					// Outer loop: move in the appropriate direction.
					if ((nextSibling = current[steps < 0 ? 'previousSibling' : 'nextSibling'])) {
						do {
							// Inner loop: advance, and dig into children if applicable.
							current = nextSibling;
							if (current && (current.className + ' ').indexOf(targetClass + ' ') > -1) {
								// Element with the appropriate class name; count step, stop digging.
								element = current;
								steps += steps < 0 ? 1 : -1;
								break;
							}
							// If the next sibling isn't a match, drill down to search, unless
							// visible is true and children are hidden.
						} while ((nextSibling = (!visible || !current.hidden) &&
							current[steps < 0 ? 'lastChild' : 'firstChild']));
					}
					else {
						current = current.parentNode;
						if (!current || current === this.bodyNode || current === this.headerNode) {
							// Break out if we step out of the navigation area entirely.
							break;
						}
					}
				}while (steps);
				// Return the final element we arrived at, which might still be the
				// starting element if we couldn't navigate further in that direction.
				return element;
			},
	
			up: function (row, steps, visible) {
				// summary:
				//		Returns the row that is the given number of steps (1 by default)
				//		above the row represented by the given object.
				// row:
				//		The row to navigate upward from.
				// steps:
				//		Number of steps to navigate up from the given row; default is 1.
				// visible:
				//		If true, rows that are currently hidden (i.e. children of
				//		collapsed tree rows) will not be counted in the traversal.
				// returns:
				//		A row object representing the appropriate row.  If the top of the
				//		list is reached before the given number of steps, the first row will
				//		be returned.
				if (!row.element) {
					row = this.row(row);
				}
				return this.row(this._move(row, -(steps || 1), 'dgrid-row', visible));
			},
			down: function (row, steps, visible) {
				// summary:
				//		Returns the row that is the given number of steps (1 by default)
				//		below the row represented by the given object.
				// row:
				//		The row to navigate downward from.
				// steps:
				//		Number of steps to navigate down from the given row; default is 1.
				// visible:
				//		If true, rows that are currently hidden (i.e. children of
				//		collapsed tree rows) will not be counted in the traversal.
				// returns:
				//		A row object representing the appropriate row.  If the bottom of the
				//		list is reached before the given number of steps, the last row will
				//		be returned.
				if (!row.element) {
					row = this.row(row);
				}
				return this.row(this._move(row, steps || 1, 'dgrid-row', visible));
			},
	
			scrollTo: function (options) {
				if (typeof options.x !== 'undefined') {
					this.bodyNode.scrollLeft = options.x;
				}
				if (typeof options.y !== 'undefined') {
					this.bodyNode.scrollTop = options.y;
				}
			},
	
			getScrollPosition: function () {
				return {
					x: this.bodyNode.scrollLeft,
					y: this.bodyNode.scrollTop
				};
			},
	
			get: function (/*String*/ name /*, ... */) {
				// summary:
				//		Get a property on a List instance.
				//	name:
				//		The property to get.
				//	returns:
				//		The property value on this List instance.
				// description:
				//		Get a named property on a List object. The property may
				//		potentially be retrieved via a getter method in subclasses. In the base class
				//		this just retrieves the object's property.
	
				var fn = '_get' + name.charAt(0).toUpperCase() + name.slice(1);
	
				if (typeof this[fn] === 'function') {
					return this[fn].apply(this, [].slice.call(arguments, 1));
				}
	
				// Alert users that try to use Dijit-style getter/setters so they don’t get confused
				// if they try to use them and it does not work
				if (!has('dojo-built') && typeof this[fn + 'Attr'] === 'function') {
					console.warn('dgrid: Use ' + fn + ' instead of ' + fn + 'Attr for getting ' + name);
				}
	
				return this[name];
			},
	
			set: function (/*String*/ name, /*Object*/ value /*, ... */) {
				//	summary:
				//		Set a property on a List instance
				//	name:
				//		The property to set.
				//	value:
				//		The value to set in the property.
				//	returns:
				//		The function returns this List instance.
				//	description:
				//		Sets named properties on a List object.
				//		A programmatic setter may be defined in subclasses.
				//
				//		set() may also be called with a hash of name/value pairs, ex:
				//	|	myObj.set({
				//	|		foo: "Howdy",
				//	|		bar: 3
				//	|	})
				//		This is equivalent to calling set(foo, "Howdy") and set(bar, 3)
	
				if (typeof name === 'object') {
					for (var k in name) {
						this.set(k, name[k]);
					}
				}
				else {
					var fn = '_set' + name.charAt(0).toUpperCase() + name.slice(1);
	
					if (typeof this[fn] === 'function') {
						this[fn].apply(this, [].slice.call(arguments, 1));
					}
					else {
						// Alert users that try to use Dijit-style getter/setters so they don’t get confused
						// if they try to use them and it does not work
						if (!has('dojo-built') && typeof this[fn + 'Attr'] === 'function') {
							console.warn('dgrid: Use ' + fn + ' instead of ' + fn + 'Attr for setting ' + name);
						}
	
						this[name] = value;
					}
				}
	
				return this;
			},
	
			// Accept both class and className programmatically to set domNode class.
			_getClass: getClass,
			_setClass: setClass,
			_getClassName: getClass,
			_setClassName: setClass,
	
			_setSort: function (property, descending) {
				// summary:
				//		Sort the content
				// property: String|Array
				//		String specifying field to sort by, or actual array of objects
				//		with property and descending properties
				// descending: boolean
				//		In the case where property is a string, this argument
				//		specifies whether to sort ascending (false) or descending (true)
	
				this.sort = typeof property !== 'string' ? property :
					[{property: property, descending: descending}];
	
				this._applySort();
			},
	
			_applySort: function () {
				// summary:
				//		Applies the current sort
				// description:
				//		This is an extension point to allow specializations to apply the sort differently
	
				this.refresh();
	
				if (this._lastCollection) {
					var sort = this.sort;
					if (sort && sort.length > 0) {
						var property = sort[0].property,
							descending = !!sort[0].descending;
						this._lastCollection.sort(function (a, b) {
							var aVal = a[property], bVal = b[property];
							// fall back undefined values to "" for more consistent behavior
							if (aVal === undefined) {
								aVal = '';
							}
							if (bVal === undefined) {
								bVal = '';
							}
							return aVal === bVal ? 0 : (aVal > bVal !== descending ? 1 : -1);
						});
					}
					this.renderArray(this._lastCollection);
				}
			},
	
			_setShowHeader: function (show) {
				// this is in List rather than just in Grid, primarily for two reasons:
				// (1) just in case someone *does* want to show a header in a List
				// (2) helps address IE < 8 header display issue in List
	
				var headerNode = this.headerNode;
	
				this.showHeader = show;
	
				// add/remove class which has styles for "hiding" header
				domClass.toggle(headerNode, 'dgrid-header-hidden', !show);
	
				this.renderHeader();
				this.resize(); // resize to account for (dis)appearance of header
	
				if (show) {
					// Update scroll position of header to make sure it's in sync.
					headerNode.scrollLeft = this.getScrollPosition().x;
				}
			},
	
			_setShowFooter: function (show) {
				this.showFooter = show;
	
				// add/remove class which has styles for hiding footer
				domClass.toggle(this.footerNode, 'dgrid-footer-hidden', !show);
	
				this.resize(); // to account for (dis)appearance of footer
			}
		});
	
		List.autoIdPrefix = 'dgrid_';
	
		return List;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(4)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (has) {
		// summary:
		//		This module defines miscellaneous utility methods for purposes of
		//		adding styles, and throttling/debouncing function calls.
	
		has.add('dom-contains', function (global, doc, element) {
			return !!element.contains; // not supported by FF < 9
		});
	
		// establish an extra stylesheet which addCssRule calls will use,
		// plus an array to track actual indices in stylesheet for removal
		var extraRules = [],
			extraSheet,
			removeMethod,
			rulesProperty,
			invalidCssChars = /([^A-Za-z0-9_\u00A0-\uFFFF-])/g;
	
		function removeRule(index) {
			// Function called by the remove method on objects returned by addCssRule.
			var realIndex = extraRules[index],
				i, l;
			if (realIndex === undefined) {
				return; // already removed
			}
	
			// remove rule indicated in internal array at index
			extraSheet[removeMethod](realIndex);
	
			// Clear internal array item representing rule that was just deleted.
			// NOTE: we do NOT splice, since the point of this array is specifically
			// to negotiate the splicing that occurs in the stylesheet itself!
			extraRules[index] = undefined;
	
			// Then update array items as necessary to downshift remaining rule indices.
			// Can start at index + 1, since array is sparse but strictly increasing.
			for (i = index + 1, l = extraRules.length; i < l; i++) {
				if (extraRules[i] > realIndex) {
					extraRules[i]--;
				}
			}
		}
	
		var util = {
			// Throttle/debounce functions
	
			defaultDelay: 15,
			throttle: function (cb, context, delay) {
				// summary:
				//		Returns a function which calls the given callback at most once per
				//		delay milliseconds.  (Inspired by plugd)
				var ran = false;
				delay = delay || util.defaultDelay;
				return function () {
					if (ran) {
						return;
					}
					ran = true;
					cb.apply(context, arguments);
					setTimeout(function () {
						ran = false;
					}, delay);
				};
			},
			throttleDelayed: function (cb, context, delay) {
				// summary:
				//		Like throttle, except that the callback runs after the delay,
				//		rather than before it.
				var ran = false;
				delay = delay || util.defaultDelay;
				return function () {
					if (ran) {
						return;
					}
					ran = true;
					var a = arguments;
					setTimeout(function () {
						ran = false;
						cb.apply(context, a);
					}, delay);
				};
			},
			debounce: function (cb, context, delay) {
				// summary:
				//		Returns a function which calls the given callback only after a
				//		certain time has passed without successive calls.  (Inspired by plugd)
				var timer;
				delay = delay || util.defaultDelay;
				return function () {
					if (timer) {
						clearTimeout(timer);
						timer = null;
					}
					var a = arguments;
					timer = setTimeout(function () {
						cb.apply(context, a);
					}, delay);
				};
			},
	
			// Iterative functions
	
			each: function (arrayOrObject, callback, context) {
				// summary:
				//		Given an array or object, iterates through its keys.
				//		Does not use hasOwnProperty (since even Dojo does not
				//		consistently use it), but will iterate using a for or for-in
				//		loop as appropriate.
	
				var i, len;
	
				if (!arrayOrObject) {
					return;
				}
	
				if (typeof arrayOrObject.length === 'number') {
					for (i = 0, len = arrayOrObject.length; i < len; i++) {
						callback.call(context, arrayOrObject[i], i, arrayOrObject);
					}
				}
				else {
					for (i in arrayOrObject) {
						callback.call(context, arrayOrObject[i], i, arrayOrObject);
					}
				}
			},
	
			// CSS-related functions
	
			addCssRule: function (selector, css) {
				// summary:
				//		Dynamically adds a style rule to the document.  Returns an object
				//		with a remove method which can be called to later remove the rule.
	
				if (!extraSheet) {
					// First time, create an extra stylesheet for adding rules
					extraSheet = document.createElement('style');
					document.getElementsByTagName('head')[0].appendChild(extraSheet);
					// Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
					extraSheet = extraSheet.sheet || extraSheet.styleSheet;
					// Store name of method used to remove rules (`removeRule` for IE < 9)
					removeMethod = extraSheet.deleteRule ? 'deleteRule' : 'removeRule';
					// Store name of property used to access rules (`rules` for IE < 9)
					rulesProperty = extraSheet.cssRules ? 'cssRules' : 'rules';
				}
	
				var index = extraRules.length;
				extraRules[index] = (extraSheet.cssRules || extraSheet.rules).length;
				extraSheet.addRule ?
					extraSheet.addRule(selector, css) :
					extraSheet.insertRule(selector + '{' + css + '}', extraRules[index]);
	
				return {
					get: function (prop) {
						return extraSheet[rulesProperty][extraRules[index]].style[prop];
					},
					set: function (prop, value) {
						if (typeof extraRules[index] !== 'undefined') {
							extraSheet[rulesProperty][extraRules[index]].style[prop] = value;
						}
					},
					remove: function () {
						removeRule(index);
					}
				};
			},
	
			escapeCssIdentifier: function (id, replace) {
				// summary:
				//		Escapes normally-invalid characters in a CSS identifier (such as . or :);
				//		see http://www.w3.org/TR/CSS2/syndata.html#value-def-identifier
				// id: String
				//		CSS identifier (e.g. tag name, class, or id) to be escaped
				// replace: String?
				//		If specified, indicates that invalid characters should be
				//		replaced by the given string rather than being escaped
	
				return typeof id === 'string' ? id.replace(invalidCssChars, replace || '\\$1') : id;
			}
		};
		return util;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports) {

	// Special module used when condition of dojo/has failed and no failback module specified
	module.exports = undefined;

/***/ },
/* 34 */
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
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(38),
		__webpack_require__(57)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(declare, Request, Cache) {
		return declare([ Request, Cache ], {
			postscript: function () {
				this.inherited(arguments);
				this.fetch();
			},
			isValidFetchCache: true
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(39),
		__webpack_require__(8),
		__webpack_require__(28),
		__webpack_require__(51),
		__webpack_require__(1),
		__webpack_require__(52),
		__webpack_require__(56)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (request, lang, arrayUtil, JSON, declare, Store, QueryResults) {
	
		var push = [].push;
	
		return declare(Store, {
			// summary:
			//		This is a basic store for RESTful communicating with a server through JSON
			//		formatted data. It extends dstore/Store.
	
			constructor: function () {
				// summary:
				//		This is a basic store for RESTful communicating with a server through JSON
				//		formatted data.
				// options: dstore/JsonRest
				//		This provides any configuration information that will be mixed into the store
				this.headers || (this.headers = {});
	
				this._targetContainsQueryString = this.target.lastIndexOf('?') >= 0;
			},
	
			// headers: Object
			//		Additional headers to pass in all requests to the server. These can be overridden
			//		by passing additional headers to calls to the store.
			headers: {},
	
			// parse: Function
			//		This function performs the parsing of the response text from the server. This
			//		defaults to JSON, but other formats can be parsed by providing an alternate
			//		parsing function. If you do want to use an alternate format, you will probably
			//		want to use an alternate stringify function for the serialization of data as well.
			//		Also, if you want to support parsing a larger set of JavaScript objects
			//		outside of strict JSON parsing, you can provide dojo/_base/json.fromJson as the parse function
			parse: JSON.parse,
	
			// target: String
			//		The target base URL to use for all requests to the server. This string will be
			//		prepended to the id to generate the URL (relative or absolute) for requests
			//		sent to the server
			target: '',
	
			// _targetContainsQueryString: Boolean
			//		A flag indicating whether the target contains a query string
	
			// sortParam: String
			//		The query parameter to used for holding sort information. If this is omitted, than
			//		the sort information is included in a functional query token to avoid colliding
			//		with the set of name/value pairs.
	
			// ascendingPrefix: String
			//		The prefix to apply to sort property names that are ascending
			ascendingPrefix: '+',
	
			// descendingPrefix: String
			//		The prefix to apply to sort property names that are ascending
			descendingPrefix: '-',
	
			// accepts: String
			//		Defines the Accept header to use on HTTP requests
			accepts: 'application/json',
	
			// useRangeHeaders: Boolean
			//		The indicates if range limits (start and end) should be specified
			//		a Range header, using items units. If this is set to true, a header
			//		be included of the form:
			//			Range: items=start-end
	
			// rangeStartParam: String
			//		The indicates if range limits (start and end) should be specified
			//		in a query parameter, and what the start parameter should be.
			//		This must be used in conjunction with the rangeCountParam
			//		If this is not specified, the range will
			//		included with a RQL style limit() parameter
			// rangeCountParam: String
			//		The indicates if range limits (start and end) should be specified
			//		in a query parameter, and what the count parameter should be.
			//		This must be used in conjunction with the rangeStartParam
			//		If this is not specified, the range will
			//		included with a RQL style limit() parameter
	
			fetch: function (kwArgs) {
				var results = this._request(kwArgs);
				return new QueryResults(results.data, {
					response: results.response
				});
			},
	
			fetchRange: function (kwArgs) {
				var start = kwArgs.start,
					end = kwArgs.end,
					requestArgs = {};
				if (this.useRangeHeaders) {
					requestArgs.headers = lang.mixin(this._renderRangeHeaders(start, end), kwArgs.headers);
				} else {
					requestArgs.queryParams = this._renderRangeParams(start, end);
					if (kwArgs.headers) {
						requestArgs.headers = kwArgs.headers;
					}
				}
	
				var results = this._request(requestArgs);
				return new QueryResults(results.data, {
					totalLength: results.total,
					response: results.response
				});
			},
	
			_request: function (kwArgs) {
				kwArgs = kwArgs || {};
	
				// perform the actual query
				var headers = lang.delegate(this.headers, { Accept: this.accepts });
	
				if ('headers' in kwArgs) {
					lang.mixin(headers, kwArgs.headers);
				}
	
				var requestUrl = this._renderUrl(kwArgs.queryParams);
	
				var response = request(requestUrl, {
					method: 'GET',
					headers: headers
				});
				var collection = this;
				var parsedResponse = response.then(function (response) {
					return collection.parse(response);
				});
				return {
					data: parsedResponse.then(function (data) {
						// support items in the results
						var results = data.items || data;
						for (var i = 0, l = results.length; i < l; i++) {
							results[i] = collection._restore(results[i], true);
						}
						return results;
					}),
					total: parsedResponse.then(function (data) {
						// check for a total property
						var total = data.total;
						if (total > -1) {
							// if we have a valid positive number from the data,
							// we can use that
							return total;
						}
						// else use headers
						return response.response.then(function (response) {
							var range = response.getHeader('Content-Range');
							return range && (range = range.match(/\/(.*)/)) && +range[1];
						});
					}),
					response: response.response
				};
			},
	
			_renderFilterParams: function (filter) {
				// summary:
				//		Constructs filter-related params to be inserted into the query string
				// returns: String
				//		Filter-related params to be inserted in the query string
				var type = filter.type;
				var args = filter.args;
				if (!type) {
					return [''];
				}
				if (type === 'string') {
					return [args[0]];
				}
				if (type === 'and' || type === 'or') {
					return [arrayUtil.map(filter.args, function (arg) {
						// render each of the arguments to and or or, then combine by the right operator
						var renderedArg = this._renderFilterParams(arg);
						return ((arg.type === 'and' || arg.type === 'or') && arg.type !== type) ?
							// need to observe precedence in the case of changing combination operators
							'(' + renderedArg + ')' : renderedArg;
					}, this).join(type === 'and' ? '&' : '|')];
				}
				var target = args[1];
				if (target) {
					if(target._renderUrl) {
						// detected nested query, and render the url inside as an argument
						target = '(' + target._renderUrl() + ')';
					} else if (target instanceof Array) {
						target = '(' + target + ')';
					}
				}
				return [encodeURIComponent(args[0]) + '=' + (type === 'eq' ? '' : type + '=') + encodeURIComponent(target)];
			},
			_renderSortParams: function (sort) {
				// summary:
				//		Constructs sort-related params to be inserted in the query string
				// returns: String
				//		Sort-related params to be inserted in the query string
	
				var sortString = arrayUtil.map(sort, function (sortOption) {
					var prefix = sortOption.descending ? this.descendingPrefix : this.ascendingPrefix;
					return prefix + encodeURIComponent(sortOption.property);
				}, this);
	
				var params = [];
				if (sortString) {
					params.push(this.sortParam
						? encodeURIComponent(this.sortParam) + '=' + sortString
						: 'sort(' + sortString + ')'
					);
				}
				return params;
			},
			_renderRangeParams: function (start, end) {
				// summary:
				//		Constructs range-related params to be inserted in the query string
				// returns: String
				//		Range-related params to be inserted in the query string
				var params = [];
				if (this.rangeStartParam) {
					params.push(
						this.rangeStartParam + '=' + start,
						this.rangeCountParam + '=' + (end - start)
					);
				} else {
					params.push('limit(' + (end - start) + (start ? (',' + start) : '') + ')');
				}
				return params;
			},
	
			_renderSelectParams: function (properties) {
				// summary:
				//		Constructs range-related params to be inserted in the query string
				// returns: String
				//		Range-related params to be inserted in the query string
				var params = [];
				if (this.selectParam) {
					params.push(this.selectParam + '=' + properties);
				} else {
					params.push('select(' + properties + ')');
				}
				return params;
			},
	
			_renderQueryParams: function () {
				var queryParams = [];
	
				arrayUtil.forEach(this.queryLog, function (entry) {
					var type = entry.type,
						renderMethod = '_render' + type[0].toUpperCase() + type.substr(1) + 'Params';
	
					if (this[renderMethod]) {
						push.apply(queryParams, this[renderMethod].apply(this, entry.normalizedArguments));
					} else {
						console.warn('Unable to render query params for "' + type + '" query', entry);
					}
				}, this);
	
				return queryParams;
			},
	
			_renderUrl: function (requestParams) {
				// summary:
				//		Constructs the URL used to fetch the data.
				// returns: String
				//		The URL of the data
	
				var queryParams = this._renderQueryParams(),
					requestUrl = this.target;
	
				if (requestParams) {
					push.apply(queryParams, requestParams);
				}
	
				if (queryParams.length > 0) {
					requestUrl += (this._targetContainsQueryString ? '&' : '?') + queryParams.join('&');
				}
				return requestUrl;
			},
	
			_renderRangeHeaders: function (start, end) {
				// summary:
				//		Applies a Range header if this collection incorporates a range query
				// headers: Object
				//		The headers to which a Range property is added
	
				var value = 'items=' + start + '-' + (end - 1);
				return {
					'Range': value,
					'X-Range': value //set X-Range for Opera since it blocks "Range" header
				};
			}
		});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(40)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(request/*=====, declare, Promise =====*/){
		/*=====
		request = function(url, options){
			// summary:
			//		Send a request using the default transport for the current platform.
			// url: String
			//		The URL to request.
			// options: dojo/request.__Options?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		request.__Promise = declare(Promise, {
			// response: dojo/promise/Promise
			//		A promise resolving to an object representing
			//		the response from the server.
		});
		request.__BaseOptions = declare(null, {
			// query: String|Object?
			//		Query parameters to append to the URL.
			// data: String|Object?
			//		Data to transfer.  This is ignored for GET and DELETE
			//		requests.
			// preventCache: Boolean?
			//		Whether to append a cache-busting parameter to the URL.
			// timeout: Integer?
			//		Milliseconds to wait for the response.  If this time
			//		passes, the then the promise is rejected.
			// handleAs: String?
			//		How to handle the response from the server.  Default is
			//		'text'.  Other values are 'json', 'javascript', and 'xml'.
		});
		request.__MethodOptions = declare(null, {
			// method: String?
			//		The HTTP method to use to make the request.  Must be
			//		uppercase.
		});
		request.__Options = declare([request.__BaseOptions, request.__MethodOptions]);
	
		request.get = function(url, options){
			// summary:
			//		Send an HTTP GET request using the default transport for the current platform.
			// url: String
			//		URL to request
			// options: dojo/request.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		request.post = function(url, options){
			// summary:
			//		Send an HTTP POST request using the default transport for the current platform.
			// url: String
			//		URL to request
			// options: dojo/request.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		request.put = function(url, options){
			// summary:
			//		Send an HTTP POST request using the default transport for the current platform.
			// url: String
			//		URL to request
			// options: dojo/request.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		request.del = function(url, options){
			// summary:
			//		Send an HTTP DELETE request using the default transport for the current platform.
			// url: String
			//		URL to request
			// options: dojo/request.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		=====*/
		return request;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(41),
		__webpack_require__(43),
		__webpack_require__(50),
		__webpack_require__(44),
		__webpack_require__(4)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(RequestError, watch, handlers, util, has/*=====, request, declare =====*/){
		has.add('native-xhr', function(){
			// if true, the environment has a native XHR implementation
			return typeof XMLHttpRequest !== 'undefined';
		});
		has.add('dojo-force-activex-xhr', function(){
			return has('activex') && window.location.protocol === 'file:';
		});
	
		has.add('native-xhr2', function(){
			if(!has('native-xhr') || has('dojo-force-activex-xhr')){ return; }
			var x = new XMLHttpRequest();
			return typeof x['addEventListener'] !== 'undefined' &&
				(typeof opera === 'undefined' || typeof x['upload'] !== 'undefined');
		});
	
		has.add('native-formdata', function(){
			// if true, the environment has a native FormData implementation
			return typeof FormData !== 'undefined';
		});
	
		has.add('native-response-type', function(){
			return has('native-xhr') && typeof new XMLHttpRequest().responseType !== 'undefined';
		});
	
		has.add('native-xhr2-blob', function(){
			if(!has('native-response-type')){ return; }
			var x = new XMLHttpRequest();
			x.open('GET', '/', true);
			x.responseType = 'blob';
			// will not be set if unsupported
			var responseType = x.responseType;
			x.abort();
			return responseType === 'blob';
		});
	
		// Google Chrome doesn't support "json" response type
		// up to version 30, so it's intentionally not included here
		var nativeResponseTypes = {
			'blob': has('native-xhr2-blob') ? 'blob' : 'arraybuffer',
			'document': 'document',
			'arraybuffer': 'arraybuffer'
		};
	
		function handleResponse(response, error){
			var _xhr = response.xhr;
			response.status = response.xhr.status;
	
			try {
				// Firefox throws an error when trying to access
				// xhr.responseText if response isn't text
				response.text = _xhr.responseText;
			} catch (e) {}
	
			if(response.options.handleAs === 'xml'){
				response.data = _xhr.responseXML;
			}
	
			if(!error){
				try{
					handlers(response);
				}catch(e){
					error = e;
				}
			}
			var handleError;
			if(error){
				this.reject(error);
			}else{
				try{
					handlers(response);
				}catch(e){
					handleError = e;
				}
				if(util.checkStatus(_xhr.status)){
					if(!handleError){
						this.resolve(response);
					}else{
						this.reject(handleError);
					}
				}else{
					if(!handleError){
						error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
						this.reject(error);
					}else{
						error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status +
							' and an error in handleAs: transformation of response', response);
	    				this.reject(error);
					}
				}
			}
		}
	
		var isValid, isReady, addListeners, cancel;
		if(has('native-xhr2')){
			// Any platform with XHR2 will only use the watch mechanism for timeout.
	
			isValid = function(response){
				// summary:
				//		Check to see if the request should be taken out of the watch queue
				return !this.isFulfilled();
			};
			cancel = function(dfd, response){
				// summary:
				//		Canceler for deferred
				response.xhr.abort();
			};
			addListeners = function(_xhr, dfd, response){
				// summary:
				//		Adds event listeners to the XMLHttpRequest object
				function onLoad(evt){
					dfd.handleResponse(response);
				}
				function onError(evt){
					var _xhr = evt.target;
					var error = new RequestError('Unable to load ' + response.url + ' status: ' + _xhr.status, response);
					dfd.handleResponse(response, error);
				}
	
				function onProgress(evt){
					if(evt.lengthComputable){
						response.loaded = evt.loaded;
						response.total = evt.total;
						dfd.progress(response);
					} else if(response.xhr.readyState === 3){
						response.loaded = ('loaded' in evt) ? evt.loaded : evt.position;
						dfd.progress(response);
					}
				}
	
				_xhr.addEventListener('load', onLoad, false);
				_xhr.addEventListener('error', onError, false);
				_xhr.addEventListener('progress', onProgress, false);
	
				return function(){
					_xhr.removeEventListener('load', onLoad, false);
					_xhr.removeEventListener('error', onError, false);
					_xhr.removeEventListener('progress', onProgress, false);
					_xhr = null;
				};
			};
		}else{
			isValid = function(response){
				return response.xhr.readyState; //boolean
			};
			isReady = function(response){
				return 4 === response.xhr.readyState; //boolean
			};
			cancel = function(dfd, response){
				// summary:
				//		canceller function for util.deferred call.
				var xhr = response.xhr;
				var _at = typeof xhr.abort;
				if(_at === 'function' || _at === 'object' || _at === 'unknown'){
					xhr.abort();
				}
			};
		}
	
		function getHeader(headerName){
			return this.xhr.getResponseHeader(headerName);
		}
	
		var undefined,
			defaultOptions = {
				data: null,
				query: null,
				sync: false,
				method: 'GET'
			};
		function xhr(url, options, returnDeferred){
			var isFormData = has('native-formdata') && options && options.data && options.data instanceof FormData;
			var response = util.parseArgs(
				url,
				util.deepCreate(defaultOptions, options),
				isFormData
			);
			url = response.url;
			options = response.options;
	
			var remover,
				last = function(){
					remover && remover();
				};
	
			//Make the Deferred object for this xhr request.
			var dfd = util.deferred(
				response,
				cancel,
				isValid,
				isReady,
				handleResponse,
				last
			);
			var _xhr = response.xhr = xhr._create();
	
			if(!_xhr){
				// If XHR factory somehow returns nothings,
				// cancel the deferred.
				dfd.cancel(new RequestError('XHR was not created'));
				return returnDeferred ? dfd : dfd.promise;
			}
	
			response.getHeader = getHeader;
	
			if(addListeners){
				remover = addListeners(_xhr, dfd, response);
			}
	
			var data = options.data,
				async = !options.sync,
				method = options.method;
	
			try{
				// IE6 won't let you call apply() on the native function.
				_xhr.open(method, url, async, options.user || undefined, options.password || undefined);
	
				if(options.withCredentials){
					_xhr.withCredentials = options.withCredentials;
				}
	
				if(has('native-response-type') && options.handleAs in nativeResponseTypes) {
					_xhr.responseType = nativeResponseTypes[options.handleAs];
				}
	
				var headers = options.headers,
					contentType = isFormData ? false : 'application/x-www-form-urlencoded';
				if(headers){
					for(var hdr in headers){
						if(hdr.toLowerCase() === 'content-type'){
							contentType = headers[hdr];
						}else if(headers[hdr]){
							//Only add header if it has a value. This allows for instance, skipping
							//insertion of X-Requested-With by specifying empty value.
							_xhr.setRequestHeader(hdr, headers[hdr]);
						}
					}
				}
	
				if(contentType && contentType !== false){
					_xhr.setRequestHeader('Content-Type', contentType);
				}
				if(!headers || !('X-Requested-With' in headers)){
					_xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				}
	
				if(util.notify){
					util.notify.emit('send', response, dfd.promise.cancel);
				}
				_xhr.send(data);
			}catch(e){
				dfd.reject(e);
			}
	
			watch(dfd);
			_xhr = null;
	
			return returnDeferred ? dfd : dfd.promise;
		}
	
		/*=====
		xhr = function(url, options){
			// summary:
			//		Sends a request using XMLHttpRequest with the given URL and options.
			// url: String
			//		URL to request
			// options: dojo/request/xhr.__Options?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		xhr.__BaseOptions = declare(request.__BaseOptions, {
			// sync: Boolean?
			//		Whether to make a synchronous request or not. Default
			//		is `false` (asynchronous).
			// data: String|Object|FormData?
			//		Data to transfer. This is ignored for GET and DELETE
			//		requests.
			// headers: Object?
			//		Headers to use for the request.
			// user: String?
			//		Username to use during the request.
			// password: String?
			//		Password to use during the request.
			// withCredentials: Boolean?
			//		For cross-site requests, whether to send credentials
			//		or not.
		});
		xhr.__MethodOptions = declare(null, {
			// method: String?
			//		The HTTP method to use to make the request. Must be
			//		uppercase. Default is `"GET"`.
		});
		xhr.__Options = declare([xhr.__BaseOptions, xhr.__MethodOptions]);
	
		xhr.get = function(url, options){
			// summary:
			//		Send an HTTP GET request using XMLHttpRequest with the given URL and options.
			// url: String
			//		URL to request
			// options: dojo/request/xhr.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		xhr.post = function(url, options){
			// summary:
			//		Send an HTTP POST request using XMLHttpRequest with the given URL and options.
			// url: String
			//		URL to request
			// options: dojo/request/xhr.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		xhr.put = function(url, options){
			// summary:
			//		Send an HTTP PUT request using XMLHttpRequest with the given URL and options.
			// url: String
			//		URL to request
			// options: dojo/request/xhr.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		xhr.del = function(url, options){
			// summary:
			//		Send an HTTP DELETE request using XMLHttpRequest with the given URL and options.
			// url: String
			//		URL to request
			// options: dojo/request/xhr.__BaseOptions?
			//		Options for the request.
			// returns: dojo/request.__Promise
		};
		=====*/
		xhr._create = function(){
			// summary:
			//		does the work of portably generating a new XMLHTTPRequest object.
			throw new Error('XMLHTTP not available');
		};
		if(has('native-xhr') && !has('dojo-force-activex-xhr')){
			xhr._create = function(){
				return new XMLHttpRequest();
			};
		}else if(has('activex')){
			try{
				new ActiveXObject('Msxml2.XMLHTTP');
				xhr._create = function(){
					return new ActiveXObject('Msxml2.XMLHTTP');
				};
			}catch(e){
				try{
					new ActiveXObject('Microsoft.XMLHTTP');
					xhr._create = function(){
						return new ActiveXObject('Microsoft.XMLHTTP');
					};
				}catch(e){}
			}
		}
	
		util.addCommonMethods(xhr);
	
		return xhr;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(42)], __WEBPACK_AMD_DEFINE_RESULT__ = function(create){
		// module:
		//		dojo/errors/RequestError
	
		/*=====
		 return function(){
			 // summary:
			 //		TODOC
		 };
		 =====*/
	
		return create("RequestError", function(message, response){
			this.response = response;
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang){
		return function(name, ctor, base, props){
			base = base || Error;
	
			var ErrorCtor = function(message){
				if(base === Error){
					if(Error.captureStackTrace){
						Error.captureStackTrace(this, ErrorCtor);
					}
	
					// Error.call() operates on the returned error
					// object rather than operating on |this|
					var err = Error.call(this, message),
						prop;
	
					// Copy own properties from err to |this|
					for(prop in err){
						if(err.hasOwnProperty(prop)){
							this[prop] = err[prop];
						}
					}
	
					// messsage is non-enumerable in ES5
					this.message = message;
					// stack is non-enumerable in at least Firefox
					this.stack = err.stack;
				}else{
					base.apply(this, arguments);
				}
				if(ctor){
					ctor.apply(this, arguments);
				}
			};
	
			ErrorCtor.prototype = lang.delegate(base.prototype, props);
			ErrorCtor.prototype.name = name;
			ErrorCtor.prototype.constructor = ErrorCtor;
	
			return ErrorCtor;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(44),
		__webpack_require__(49),
		__webpack_require__(45),
		__webpack_require__(28),
		__webpack_require__(12),
		__webpack_require__(33)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(util, RequestTimeoutError, CancelError, array, win, on){
		// avoid setting a timer per request. It degrades performance on IE
		// something fierece if we don't use unified loops.
		var _inFlightIntvl = null,
			_inFlight = [];
	
		function watchInFlight(){
			// summary:
			//		internal method that checks each inflight XMLHttpRequest to see
			//		if it has completed or if the timeout situation applies.
	
			var now = +(new Date);
	
			// we need manual loop because we often modify _inFlight (and therefore 'i') while iterating
			for(var i = 0, dfd; i < _inFlight.length && (dfd = _inFlight[i]); i++){
				var response = dfd.response,
					options = response.options;
				if((dfd.isCanceled && dfd.isCanceled()) || (dfd.isValid && !dfd.isValid(response))){
					_inFlight.splice(i--, 1);
					watch._onAction && watch._onAction();
				}else if(dfd.isReady && dfd.isReady(response)){
					_inFlight.splice(i--, 1);
					dfd.handleResponse(response);
					watch._onAction && watch._onAction();
				}else if(dfd.startTime){
					// did we timeout?
					if(dfd.startTime + (options.timeout || 0) < now){
						_inFlight.splice(i--, 1);
						// Cancel the request so the io module can do appropriate cleanup.
						dfd.cancel(new RequestTimeoutError('Timeout exceeded', response));
						watch._onAction && watch._onAction();
					}
				}
			}
	
			watch._onInFlight && watch._onInFlight(dfd);
	
			if(!_inFlight.length){
				clearInterval(_inFlightIntvl);
				_inFlightIntvl = null;
			}
		}
	
		function watch(dfd){
			// summary:
			//		Watches the io request represented by dfd to see if it completes.
			// dfd: Deferred
			//		The Deferred object to watch.
			// response: Object
			//		The object used as the value of the request promise.
			// validCheck: Function
			//		Function used to check if the IO request is still valid. Gets the dfd
			//		object as its only argument.
			// ioCheck: Function
			//		Function used to check if basic IO call worked. Gets the dfd
			//		object as its only argument.
			// resHandle: Function
			//		Function used to process response. Gets the dfd
			//		object as its only argument.
			if(dfd.response.options.timeout){
				dfd.startTime = +(new Date);
			}
	
			if(dfd.isFulfilled()){
				// bail out if the deferred is already fulfilled
				return;
			}
	
			_inFlight.push(dfd);
			if(!_inFlightIntvl){
				_inFlightIntvl = setInterval(watchInFlight, 50);
			}
	
			// handle sync requests separately from async:
			// http://bugs.dojotoolkit.org/ticket/8467
			if(dfd.response.options.sync){
				watchInFlight();
			}
		}
	
		watch.cancelAll = function cancelAll(){
			// summary:
			//		Cancels all pending IO requests, regardless of IO type
			try{
				array.forEach(_inFlight, function(dfd){
					try{
						dfd.cancel(new CancelError('All requests canceled.'));
					}catch(e){}
				});
			}catch(e){}
		};
	
		if(win && on && win.doc.attachEvent){
			// Automatically call cancel all io calls on unload in IE
			// http://bugs.dojotoolkit.org/ticket/2357
			on(win.global, 'unload', function(){
				watch.cancelAll();
			});
		}
	
		return watch;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		exports,
		__webpack_require__(41),
		__webpack_require__(45),
		__webpack_require__(46),
		__webpack_require__(48),
		__webpack_require__(28),
		__webpack_require__(8),
		__webpack_require__(47)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(exports, RequestError, CancelError, Deferred, ioQuery, array, lang, Promise){
		exports.deepCopy = function deepCopy(target, source){
			for(var name in source){
				var tval = target[name],
					sval = source[name];
				if(tval !== sval){
					if(tval && typeof tval === 'object' && sval && typeof sval === 'object'){
						exports.deepCopy(tval, sval);
					}else{
						target[name] = sval;
					}
				}
			}
			return target;
		};
	
		exports.deepCreate = function deepCreate(source, properties){
			properties = properties || {};
			var target = lang.delegate(source),
				name, value;
	
			for(name in source){
				value = source[name];
	
				if(value && typeof value === 'object'){
					target[name] = exports.deepCreate(value, properties[name]);
				}
			}
			return exports.deepCopy(target, properties);
		};
	
		var freeze = Object.freeze || function(obj){ return obj; };
		function okHandler(response){
			return freeze(response);
		}
		function dataHandler (response) {
			return response.data !== undefined ? response.data : response.text;
		}
	
		exports.deferred = function deferred(response, cancel, isValid, isReady, handleResponse, last){
			var def = new Deferred(function(reason){
				cancel && cancel(def, response);
	
				if(!reason || !(reason instanceof RequestError) && !(reason instanceof CancelError)){
					return new CancelError('Request canceled', response);
				}
				return reason;
			});
	
			def.response = response;
			def.isValid = isValid;
			def.isReady = isReady;
			def.handleResponse = handleResponse;
	
			function errHandler(error){
				error.response = response;
				throw error;
			}
			var responsePromise = def.then(okHandler).otherwise(errHandler);
	
			if(exports.notify){
				responsePromise.then(
					lang.hitch(exports.notify, 'emit', 'load'),
					lang.hitch(exports.notify, 'emit', 'error')
				);
			}
	
			var dataPromise = responsePromise.then(dataHandler);
	
			// http://bugs.dojotoolkit.org/ticket/16794
			// The following works around a leak in IE9 through the
			// prototype using lang.delegate on dataPromise and
			// assigning the result a property with a reference to
			// responsePromise.
			var promise = new Promise();
			for (var prop in dataPromise) {
				if (dataPromise.hasOwnProperty(prop)) {
					promise[prop] = dataPromise[prop];
				}
			}
			promise.response = responsePromise;
			freeze(promise);
			// End leak fix
	
	
			if(last){
				def.then(function(response){
					last.call(def, response);
				}, function(error){
					last.call(def, response, error);
				});
			}
	
			def.promise = promise;
			def.then = promise.then;
	
			return def;
		};
	
		exports.addCommonMethods = function addCommonMethods(provider, methods){
			array.forEach(methods||['GET', 'POST', 'PUT', 'DELETE'], function(method){
				provider[(method === 'DELETE' ? 'DEL' : method).toLowerCase()] = function(url, options){
					options = lang.delegate(options||{});
					options.method = method;
					return provider(url, options);
				};
			});
		};
	
		exports.parseArgs = function parseArgs(url, options, skipData){
			var data = options.data,
				query = options.query;
			
			if(data && !skipData){
				if(typeof data === 'object'){
					options.data = ioQuery.objectToQuery(data);
				}
			}
	
			if(query){
				if(typeof query === 'object'){
					query = ioQuery.objectToQuery(query);
				}
				if(options.preventCache){
					query += (query ? '&' : '') + 'request.preventCache=' + (+(new Date));
				}
			}else if(options.preventCache){
				query = 'request.preventCache=' + (+(new Date));
			}
	
			if(url && query){
				url += (~url.indexOf('?') ? '&' : '?') + query;
			}
	
			return {
				url: url,
				options: options,
				getHeader: function(headerName){ return null; }
			};
		};
	
		exports.checkStatus = function(stat){
			stat = stat || 0;
			return (stat >= 200 && stat < 300) || // allow any 2XX response code
				stat === 304 ||                 // or, get it out of the cache
				stat === 1223 ||                // or, Internet Explorer mangled the status code
				!stat;                         // or, we're Titanium/browser chrome/chrome extension requesting a local file
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(42)], __WEBPACK_AMD_DEFINE_RESULT__ = function(create){
		// module:
		//		dojo/errors/CancelError
	
		/*=====
		return function(){
			// summary:
			//		Default error if a promise is canceled without a reason.
		};
		=====*/
	
		return create("CancelError", null, null, { dojoType: "cancel" });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(4),
		__webpack_require__(8),
		__webpack_require__(45),
		__webpack_require__(47),
		__webpack_require__(33)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(has, lang, CancelError, Promise, instrumentation){
		"use strict";
	
		// module:
		//		dojo/Deferred
	
		var PROGRESS = 0,
				RESOLVED = 1,
				REJECTED = 2;
		var FULFILLED_ERROR_MESSAGE = "This deferred has already been fulfilled.";
	
		var freezeObject = Object.freeze || function(){};
	
		var signalWaiting = function(waiting, type, result, rejection, deferred){
			if(has("config-deferredInstrumentation")){
				if(type === REJECTED && Deferred.instrumentRejected && waiting.length === 0){
					Deferred.instrumentRejected(result, false, rejection, deferred);
				}
			}
	
			for(var i = 0; i < waiting.length; i++){
				signalListener(waiting[i], type, result, rejection);
			}
		};
	
		var signalListener = function(listener, type, result, rejection){
			var func = listener[type];
			var deferred = listener.deferred;
			if(func){
				try{
					var newResult = func(result);
					if(type === PROGRESS){
						if(typeof newResult !== "undefined"){
							signalDeferred(deferred, type, newResult);
						}
					}else{
						if(newResult && typeof newResult.then === "function"){
							listener.cancel = newResult.cancel;
							newResult.then(
									// Only make resolvers if they're actually going to be used
									makeDeferredSignaler(deferred, RESOLVED),
									makeDeferredSignaler(deferred, REJECTED),
									makeDeferredSignaler(deferred, PROGRESS));
							return;
						}
						signalDeferred(deferred, RESOLVED, newResult);
					}
				}catch(error){
					signalDeferred(deferred, REJECTED, error);
				}
			}else{
				signalDeferred(deferred, type, result);
			}
	
			if(has("config-deferredInstrumentation")){
				if(type === REJECTED && Deferred.instrumentRejected){
					Deferred.instrumentRejected(result, !!func, rejection, deferred.promise);
				}
			}
		};
	
		var makeDeferredSignaler = function(deferred, type){
			return function(value){
				signalDeferred(deferred, type, value);
			};
		};
	
		var signalDeferred = function(deferred, type, result){
			if(!deferred.isCanceled()){
				switch(type){
					case PROGRESS:
						deferred.progress(result);
						break;
					case RESOLVED:
						deferred.resolve(result);
						break;
					case REJECTED:
						deferred.reject(result);
						break;
				}
			}
		};
	
		var Deferred = function(canceler){
			// summary:
			//		Creates a new deferred. This API is preferred over
			//		`dojo/_base/Deferred`.
			// description:
			//		Creates a new deferred, as an abstraction over (primarily)
			//		asynchronous operations. The deferred is the private interface
			//		that should not be returned to calling code. That's what the
			//		`promise` is for. See `dojo/promise/Promise`.
			// canceler: Function?
			//		Will be invoked if the deferred is canceled. The canceler
			//		receives the reason the deferred was canceled as its argument.
			//		The deferred is rejected with its return value, or a new
			//		`dojo/errors/CancelError` instance.
	
			// promise: dojo/promise/Promise
			//		The public promise object that clients can add callbacks to. 
			var promise = this.promise = new Promise();
	
			var deferred = this;
			var fulfilled, result, rejection;
			var canceled = false;
			var waiting = [];
	
			if(has("config-deferredInstrumentation") && Error.captureStackTrace){
				Error.captureStackTrace(deferred, Deferred);
				Error.captureStackTrace(promise, Deferred);
			}
	
			this.isResolved = promise.isResolved = function(){
				// summary:
				//		Checks whether the deferred has been resolved.
				// returns: Boolean
	
				return fulfilled === RESOLVED;
			};
	
			this.isRejected = promise.isRejected = function(){
				// summary:
				//		Checks whether the deferred has been rejected.
				// returns: Boolean
	
				return fulfilled === REJECTED;
			};
	
			this.isFulfilled = promise.isFulfilled = function(){
				// summary:
				//		Checks whether the deferred has been resolved or rejected.
				// returns: Boolean
	
				return !!fulfilled;
			};
	
			this.isCanceled = promise.isCanceled = function(){
				// summary:
				//		Checks whether the deferred has been canceled.
				// returns: Boolean
	
				return canceled;
			};
	
			this.progress = function(update, strict){
				// summary:
				//		Emit a progress update on the deferred.
				// description:
				//		Emit a progress update on the deferred. Progress updates
				//		can be used to communicate updates about the asynchronous
				//		operation before it has finished.
				// update: any
				//		The progress update. Passed to progbacks.
				// strict: Boolean?
				//		If strict, will throw an error if the deferred has already
				//		been fulfilled and consequently no progress can be emitted.
				// returns: dojo/promise/Promise
				//		Returns the original promise for the deferred.
	
				if(!fulfilled){
					signalWaiting(waiting, PROGRESS, update, null, deferred);
					return promise;
				}else if(strict === true){
					throw new Error(FULFILLED_ERROR_MESSAGE);
				}else{
					return promise;
				}
			};
	
			this.resolve = function(value, strict){
				// summary:
				//		Resolve the deferred.
				// description:
				//		Resolve the deferred, putting it in a success state.
				// value: any
				//		The result of the deferred. Passed to callbacks.
				// strict: Boolean?
				//		If strict, will throw an error if the deferred has already
				//		been fulfilled and consequently cannot be resolved.
				// returns: dojo/promise/Promise
				//		Returns the original promise for the deferred.
	
				if(!fulfilled){
					// Set fulfilled, store value. After signaling waiting listeners unset
					// waiting.
					signalWaiting(waiting, fulfilled = RESOLVED, result = value, null, deferred);
					waiting = null;
					return promise;
				}else if(strict === true){
					throw new Error(FULFILLED_ERROR_MESSAGE);
				}else{
					return promise;
				}
			};
	
			var reject = this.reject = function(error, strict){
				// summary:
				//		Reject the deferred.
				// description:
				//		Reject the deferred, putting it in an error state.
				// error: any
				//		The error result of the deferred. Passed to errbacks.
				// strict: Boolean?
				//		If strict, will throw an error if the deferred has already
				//		been fulfilled and consequently cannot be rejected.
				// returns: dojo/promise/Promise
				//		Returns the original promise for the deferred.
	
				if(!fulfilled){
					if(has("config-deferredInstrumentation") && Error.captureStackTrace){
						Error.captureStackTrace(rejection = {}, reject);
					}
					signalWaiting(waiting, fulfilled = REJECTED, result = error, rejection, deferred);
					waiting = null;
					return promise;
				}else if(strict === true){
					throw new Error(FULFILLED_ERROR_MESSAGE);
				}else{
					return promise;
				}
			};
	
			this.then = promise.then = function(callback, errback, progback){
				// summary:
				//		Add new callbacks to the deferred.
				// description:
				//		Add new callbacks to the deferred. Callbacks can be added
				//		before or after the deferred is fulfilled.
				// callback: Function?
				//		Callback to be invoked when the promise is resolved.
				//		Receives the resolution value.
				// errback: Function?
				//		Callback to be invoked when the promise is rejected.
				//		Receives the rejection error.
				// progback: Function?
				//		Callback to be invoked when the promise emits a progress
				//		update. Receives the progress update.
				// returns: dojo/promise/Promise
				//		Returns a new promise for the result of the callback(s).
				//		This can be used for chaining many asynchronous operations.
	
				var listener = [progback, callback, errback];
				// Ensure we cancel the promise we're waiting for, or if callback/errback
				// have returned a promise, cancel that one.
				listener.cancel = promise.cancel;
				listener.deferred = new Deferred(function(reason){
					// Check whether cancel is really available, returned promises are not
					// required to expose `cancel`
					return listener.cancel && listener.cancel(reason);
				});
				if(fulfilled && !waiting){
					signalListener(listener, fulfilled, result, rejection);
				}else{
					waiting.push(listener);
				}
				return listener.deferred.promise;
			};
	
			this.cancel = promise.cancel = function(reason, strict){
				// summary:
				//		Inform the deferred it may cancel its asynchronous operation.
				// description:
				//		Inform the deferred it may cancel its asynchronous operation.
				//		The deferred's (optional) canceler is invoked and the
				//		deferred will be left in a rejected state. Can affect other
				//		promises that originate with the same deferred.
				// reason: any
				//		A message that may be sent to the deferred's canceler,
				//		explaining why it's being canceled.
				// strict: Boolean?
				//		If strict, will throw an error if the deferred has already
				//		been fulfilled and consequently cannot be canceled.
				// returns: any
				//		Returns the rejection reason if the deferred was canceled
				//		normally.
	
				if(!fulfilled){
					// Cancel can be called even after the deferred is fulfilled
					if(canceler){
						var returnedReason = canceler(reason);
						reason = typeof returnedReason === "undefined" ? reason : returnedReason;
					}
					canceled = true;
					if(!fulfilled){
						// Allow canceler to provide its own reason, but fall back to a CancelError
						if(typeof reason === "undefined"){
							reason = new CancelError();
						}
						reject(reason);
						return reason;
					}else if(fulfilled === REJECTED && result === reason){
						return reason;
					}
				}else if(strict === true){
					throw new Error(FULFILLED_ERROR_MESSAGE);
				}
			};
	
			freezeObject(promise);
		};
	
		Deferred.prototype.toString = function(){
			// returns: String
			//		Returns `[object Deferred]`.
	
			return "[object Deferred]";
		};
	
		if(instrumentation){
			instrumentation(Deferred);
		}
	
		return Deferred;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(8)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang){
		"use strict";
	
		// module:
		//		dojo/promise/Promise
	
		function throwAbstract(){
			throw new TypeError("abstract");
		}
	
		return lang.extend(function Promise(){
			// summary:
			//		The public interface to a deferred.
			// description:
			//		The public interface to a deferred. All promises in Dojo are
			//		instances of this class.
		}, {
			then: function(callback, errback, progback){
				// summary:
				//		Add new callbacks to the promise.
				// description:
				//		Add new callbacks to the deferred. Callbacks can be added
				//		before or after the deferred is fulfilled.
				// callback: Function?
				//		Callback to be invoked when the promise is resolved.
				//		Receives the resolution value.
				// errback: Function?
				//		Callback to be invoked when the promise is rejected.
				//		Receives the rejection error.
				// progback: Function?
				//		Callback to be invoked when the promise emits a progress
				//		update. Receives the progress update.
				// returns: dojo/promise/Promise
				//		Returns a new promise for the result of the callback(s).
				//		This can be used for chaining many asynchronous operations.
	
				throwAbstract();
			},
	
			cancel: function(reason, strict){
				// summary:
				//		Inform the deferred it may cancel its asynchronous operation.
				// description:
				//		Inform the deferred it may cancel its asynchronous operation.
				//		The deferred's (optional) canceler is invoked and the
				//		deferred will be left in a rejected state. Can affect other
				//		promises that originate with the same deferred.
				// reason: any
				//		A message that may be sent to the deferred's canceler,
				//		explaining why it's being canceled.
				// strict: Boolean?
				//		If strict, will throw an error if the deferred has already
				//		been fulfilled and consequently cannot be canceled.
				// returns: any
				//		Returns the rejection reason if the deferred was canceled
				//		normally.
	
				throwAbstract();
			},
	
			isResolved: function(){
				// summary:
				//		Checks whether the promise has been resolved.
				// returns: Boolean
	
				throwAbstract();
			},
	
			isRejected: function(){
				// summary:
				//		Checks whether the promise has been rejected.
				// returns: Boolean
	
				throwAbstract();
			},
	
			isFulfilled: function(){
				// summary:
				//		Checks whether the promise has been resolved or rejected.
				// returns: Boolean
	
				throwAbstract();
			},
	
			isCanceled: function(){
				// summary:
				//		Checks whether the promise has been canceled.
				// returns: Boolean
	
				throwAbstract();
			},
	
			always: function(callbackOrErrback){
				// summary:
				//		Add a callback to be invoked when the promise is resolved
				//		or rejected.
				// callbackOrErrback: Function?
				//		A function that is used both as a callback and errback.
				// returns: dojo/promise/Promise
				//		Returns a new promise for the result of the callback/errback.
	
				return this.then(callbackOrErrback, callbackOrErrback);
			},
	
			otherwise: function(errback){
				// summary:
				//		Add new errbacks to the promise.
				// errback: Function?
				//		Callback to be invoked when the promise is rejected.
				// returns: dojo/promise/Promise
				//		Returns a new promise for the result of the errback.
	
				return this.then(null, errback);
			},
	
			trace: function(){
				return this;
			},
	
			traceRejected: function(){
				return this;
			},
	
			toString: function(){
				// returns: string
				//		Returns `[object Promise]`.
	
				return "[object Promise]";
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(lang){
	
		// module:
		//		dojo/io-query
	
		var backstop = {};
	
		return {
			// summary:
			//		This module defines query string processing functions.
	
			objectToQuery: function objectToQuery(/*Object*/ map){
				// summary:
				//		takes a name/value mapping object and returns a string representing
				//		a URL-encoded version of that object.
				// example:
				//		this object:
				//
				//	|	{
				//	|		blah: "blah",
				//	|		multi: [
				//	|			"thud",
				//	|			"thonk"
				//	|		]
				//	|	};
				//
				//		yields the following query string:
				//
				//	|	"blah=blah&multi=thud&multi=thonk"
	
				// FIXME: need to implement encodeAscii!!
				var enc = encodeURIComponent, pairs = [];
				for(var name in map){
					var value = map[name];
					if(value != backstop[name]){
						var assign = enc(name) + "=";
						if(lang.isArray(value)){
							for(var i = 0, l = value.length; i < l; ++i){
								pairs.push(assign + enc(value[i]));
							}
						}else{
							pairs.push(assign + enc(value));
						}
					}
				}
				return pairs.join("&"); // String
			},
	
			queryToObject: function queryToObject(/*String*/ str){
				// summary:
				//		Create an object representing a de-serialized query section of a
				//		URL. Query keys with multiple values are returned in an array.
				//
				// example:
				//		This string:
				//
				//	|		"foo=bar&foo=baz&thinger=%20spaces%20=blah&zonk=blarg&"
				//
				//		results in this object structure:
				//
				//	|		{
				//	|			foo: [ "bar", "baz" ],
				//	|			thinger: " spaces =blah",
				//	|			zonk: "blarg"
				//	|		}
				//
				//		Note that spaces and other urlencoded entities are correctly
				//		handled.
	
	        	var dec = decodeURIComponent, qp = str.split("&"), ret = {}, name, val;
				for(var i = 0, l = qp.length, item; i < l; ++i){
					item = qp[i];
					if(item.length){
						var s = item.indexOf("=");
						if(s < 0){
							name = dec(item);
							val = "";
						}else{
							name = dec(item.slice(0, s));
							val = dec(item.slice(s + 1));
						}
						if(typeof ret[name] == "string"){ // inline'd type check
							ret[name] = [ret[name]];
						}
	
						if(lang.isArray(ret[name])){
							ret[name].push(val);
						}else{
							ret[name] = val;
						}
					}
				}
				return ret; // Object
			}
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(42), __webpack_require__(41)], __WEBPACK_AMD_DEFINE_RESULT__ = function(create, RequestError){
		// module:
		//		dojo/errors/RequestTimeoutError
	
		/*=====
		 return function(){
			 // summary:
			 //		TODOC
		 };
		 =====*/
	
		return create("RequestTimeoutError", null, RequestError, {
			dojoType: "timeout"
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(51),
		__webpack_require__(2),
		__webpack_require__(28),
		__webpack_require__(4),
		__webpack_require__(35) 
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(JSON, kernel, array, has){
		has.add('activex', typeof ActiveXObject !== 'undefined');
		has.add('dom-parser', function(global){
			return 'DOMParser' in global;
		});
	
		var handleXML;
		if(has('activex')){
			// GUIDs obtained from http://msdn.microsoft.com/en-us/library/ms757837(VS.85).aspx
			var dp = [
				'Msxml2.DOMDocument.6.0',
				'Msxml2.DOMDocument.4.0',
				'MSXML2.DOMDocument.3.0',
				'MSXML.DOMDocument' // 2.0
			];
			var lastParser;
	
			handleXML = function(response){
				var result = response.data;
				var text = response.text;
	
				if(result && has('dom-qsa2.1') && !result.querySelectorAll && has('dom-parser')){
					// http://bugs.dojotoolkit.org/ticket/15631
					// IE9 supports a CSS3 querySelectorAll implementation, but the DOM implementation
					// returned by IE9 xhr.responseXML does not. Manually create the XML DOM to gain
					// the fuller-featured implementation and avoid bugs caused by the inconsistency
					result = new DOMParser().parseFromString(text, 'application/xml');
				}
	
				function createDocument(p) {
						try{
							var dom = new ActiveXObject(p);
							dom.async = false;
							dom.loadXML(text);
							result = dom;
							lastParser = p;
						}catch(e){ return false; }
						return true;
				}
	
				if(!result || !result.documentElement){
					// The creation of an ActiveX object is expensive, so we cache the
					// parser type to avoid trying all parser types each time we handle a
					// document. There is some concern that some parser types might fail
					// depending on the document being parsed. If parsing using the cached
					// parser type fails, we do the more expensive operation of finding one
					// that works for the given document.
					// https://bugs.dojotoolkit.org/ticket/15246
					if(!lastParser || !createDocument(lastParser)) {
						array.some(dp, createDocument);
					}
				}
	
				return result;
			};
		}
	
		var handleNativeResponse = function(response) {
			if(!has('native-xhr2-blob') && response.options.handleAs === 'blob' && typeof Blob !== 'undefined'){
				return new Blob([ response.xhr.response ], { type: response.xhr.getResponseHeader('Content-Type') });
			}
	
			return response.xhr.response;
		}
	
		var handlers = {
			'javascript': function(response){
				return kernel.eval(response.text || '');
			},
			'json': function(response){
				return JSON.parse(response.text || null);
			},
			'xml': handleXML,
			'blob': handleNativeResponse,
			'arraybuffer': handleNativeResponse,
			'document': handleNativeResponse
		};
	
		function handle(response){
			var handler = handlers[response.options.handleAs];
	
			response.data = handler ? handler(response) : (response.data || response.text);
	
			return response;
		}
	
		handle.register = function(name, handler){
			handlers[name] = handler;
		};
	
		return handle;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function(has){
		"use strict";
		var hasJSON = typeof JSON != "undefined";
		has.add("json-parse", hasJSON); // all the parsers work fine
			// Firefox 3.5/Gecko 1.9 fails to use replacer in stringify properly https://bugzilla.mozilla.org/show_bug.cgi?id=509184
		has.add("json-stringify", hasJSON && JSON.stringify({a:0}, function(k,v){return v||1;}) == '{"a":1}');
	
		/*=====
		return {
			// summary:
			//		Functions to parse and serialize JSON
	
			parse: function(str, strict){
				// summary:
				//		Parses a [JSON](http://json.org) string to return a JavaScript object.
				// description:
				//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
				//		Throws for invalid JSON strings. This delegates to eval() if native JSON
				//		support is not available. By default this will evaluate any valid JS expression.
				//		With the strict parameter set to true, the parser will ensure that only
				//		valid JSON strings are parsed (otherwise throwing an error). Without the strict
				//		parameter, the content passed to this method must come
				//		from a trusted source.
				// str:
				//		a string literal of a JSON item, for instance:
				//		`'{ "foo": [ "bar", 1, { "baz": "thud" } ] }'`
				// strict:
				//		When set to true, this will ensure that only valid, secure JSON is ever parsed.
				//		Make sure this is set to true for untrusted content. Note that on browsers/engines
				//		without native JSON support, setting this to true will run slower.
			},
			stringify: function(value, replacer, spacer){
				// summary:
				//		Returns a [JSON](http://json.org) serialization of an object.
				// description:
				//		Returns a [JSON](http://json.org) serialization of an object.
				//		This function follows [native JSON API](https://developer.mozilla.org/en/JSON)
				//		Note that this doesn't check for infinite recursion, so don't do that!
				// value:
				//		A value to be serialized.
				// replacer:
				//		A replacer function that is called for each value and can return a replacement
				// spacer:
				//		A spacer string to be used for pretty printing of JSON
				// example:
				//		simple serialization of a trivial object
				//	|	define(["dojo/json"], function(JSON){
				// 	|		var jsonStr = JSON.stringify({ howdy: "stranger!", isStrange: true });
				//	|		doh.is('{"howdy":"stranger!","isStrange":true}', jsonStr);
			}
		};
		=====*/
	
		if(has("json-stringify")){
			return JSON;
		}else{
			var escapeString = function(/*String*/str){
				// summary:
				//		Adds escape sequences for non-visual characters, double quote and
				//		backslash and surrounds with double quotes to form a valid string
				//		literal.
				return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
					replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
					replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r"); // string
			};
			return {
				parse: has("json-parse") ? JSON.parse : function(str, strict){
					if(strict && !/^([\s\[\{]*(?:"(?:\\.|[^"])*"|-?\d[\d\.]*(?:[Ee][+-]?\d+)?|null|true|false|)[\s\]\}]*(?:,|:|$))+$/.test(str)){
						throw new SyntaxError("Invalid characters in JSON");
					}
					return eval('(' + str + ')');
				},
				stringify: function(value, replacer, spacer){
					var undef;
					if(typeof replacer == "string"){
						spacer = replacer;
						replacer = null;
					}
					function stringify(it, indent, key){
						if(replacer){
							it = replacer(key, it);
						}
						var val, objtype = typeof it;
						if(objtype == "number"){
							return isFinite(it) ? it + "" : "null";
						}
						if(objtype == "boolean"){
							return it + "";
						}
						if(it === null){
							return "null";
						}
						if(typeof it == "string"){
							return escapeString(it);
						}
						if(objtype == "function" || objtype == "undefined"){
							return undef; // undefined
						}
						// short-circuit for objects that support "json" serialization
						// if they return "self" then just pass-through...
						if(typeof it.toJSON == "function"){
							return stringify(it.toJSON(key), indent, key);
						}
						if(it instanceof Date){
							return '"{FullYear}-{Month+}-{Date}T{Hours}:{Minutes}:{Seconds}Z"'.replace(/\{(\w+)(\+)?\}/g, function(t, prop, plus){
								var num = it["getUTC" + prop]() + (plus ? 1 : 0);
								return num < 10 ? "0" + num : num;
							});
						}
						if(it.valueOf() !== it){
							// primitive wrapper, try again unwrapped:
							return stringify(it.valueOf(), indent, key);
						}
						var nextIndent= spacer ? (indent + spacer) : "";
						/* we used to test for DOM nodes and throw, but FF serializes them as {}, so cross-browser consistency is probably not efficiently attainable */ 
					
						var sep = spacer ? " " : "";
						var newLine = spacer ? "\n" : "";
					
						// array
						if(it instanceof Array){
							var itl = it.length, res = [];
							for(key = 0; key < itl; key++){
								var obj = it[key];
								val = stringify(obj, nextIndent, key);
								if(typeof val != "string"){
									val = "null";
								}
								res.push(newLine + nextIndent + val);
							}
							return "[" + res.join(",") + newLine + indent + "]";
						}
						// generic object code path
						var output = [];
						for(key in it){
							var keyStr;
							if(it.hasOwnProperty(key)){
								if(typeof key == "number"){
									keyStr = '"' + key + '"';
								}else if(typeof key == "string"){
									keyStr = escapeString(key);
								}else{
									// skip non-string or number keys
									continue;
								}
								val = stringify(it[key], nextIndent, key);
								if(typeof val != "string"){
									// skip non-serializable values
									continue;
								}
								// At this point, the most non-IE browsers don't get in this branch 
								// (they have native JSON), so push is definitely the way to
								output.push(newLine + nextIndent + keyStr + ":" + sep + val);
							}
						}
						return "{" + output.join(",") + newLine + indent + "}"; // String
					}
					return stringify(value, "", "");
				}
			};
		}
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(8),
		__webpack_require__(28),
		__webpack_require__(19),
		__webpack_require__(4),
		__webpack_require__(53),
		__webpack_require__(46),
		__webpack_require__(1),
		__webpack_require__(54),
		__webpack_require__(55),
		__webpack_require__(21)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang, arrayUtil, aspect, has, when, Deferred, declare, QueryMethod, Filter, Evented) {
	
		// module:
		//		dstore/Store
		/* jshint proto: true */
		// detect __proto__, and avoid using it on Firefox, as they warn about
		// deoptimizations. The watch method is a clear indicator of the Firefox
		// JS engine.
		has.add('object-proto', !!{}.__proto__ && !({}).watch);
		var hasProto = has('object-proto');
	
		function emitUpdateEvent(type) {
			return function (result, args) {
				var self = this;
				when(result, function (result) {
					var event = { target: result },
						options = args[1] || {};
					if ('beforeId' in options) {
						event.beforeId = options.beforeId;
					}
					self.emit(type, event);
				});
	
				return result;
			};
		}
	
		var base = Evented;
		/*=====
		base = [ Evented, Collection ];
		=====*/
	
		return /*==== Store= ====*/declare(base, {
			constructor: function (options) {
				// perform the mixin
				options && declare.safeMixin(this, options);
	
				if (this.Model && this.Model.createSubclass) {
					// we need a distinct model for each store, so we can
					// save the reference back to this store on it.
					// we always create a new model to be safe.
					this.Model = this.Model.createSubclass([]).extend({
						// give a reference back to the store for saving, etc.
						_store: this
					});
				}
	
				// the object the store can use for holding any local data or events
				this.storage = new Evented();
				var store = this;
				if (this.autoEmitEvents) {
					// emit events when modification operations are called
					aspect.after(this, 'add', emitUpdateEvent('add'));
					aspect.after(this, 'put', emitUpdateEvent('update'));
					aspect.after(this, 'remove', function (result, args) {
						when(result, function () {
							store.emit('delete', {id: args[0]});
						});
						return result;
					});
				}
			},
	
			// autoEmitEvents: Boolean
			//		Indicates if the events should automatically be fired for put, add, remove
			//		method calls. Stores may wish to explicitly fire events, to control when
			//		and which event is fired.
			autoEmitEvents: true,
	
			// idProperty: String
			//		Indicates the property to use as the identity property. The values of this
			//		property should be unique.
			idProperty: 'id',
	
			// queryAccessors: Boolean
			//		Indicates if client-side query engine filtering should (if the store property is true)
			//		access object properties through the get() function (enabling querying by
			//		computed properties), or if it should (by setting this to false) use direct/raw
			// 		property access (which may more closely follow database querying style).
			queryAccessors: true,
	
			getIdentity: function (object) {
				// summary:
				//		Returns an object's identity
				// object: Object
				//		The object to get the identity from
				// returns: String|Number
	
				return object.get ? object.get(this.idProperty) : object[this.idProperty];
			},
	
			_setIdentity: function (object, identityArg) {
				// summary:
				//		Sets an object's identity
				// description:
				//		This method sets an object's identity and is useful to override to support
				//		multi-key identities and object's whose properties are not stored directly on the object.
				// object: Object
				//		The target object
				// identityArg:
				//		The argument used to set the identity
	
				if (object.set) {
					object.set(this.idProperty, identityArg);
				} else {
					object[this.idProperty] = identityArg;
				}
			},
	
			forEach: function (callback, thisObject) {
				var collection = this;
				return when(this.fetch(), function (data) {
					for (var i = 0, item; (item = data[i]) !== undefined; i++) {
						callback.call(thisObject, item, i, collection);
					}
					return data;
				});
			},
			on: function (type, listener) {
				return this.storage.on(type, listener);
			},
			emit: function (type, event) {
				event = event || {};
				event.type = type;
				try {
					return this.storage.emit(type, event);
				} finally {
					// Return the initial value of event.cancelable because a listener error makes it impossible
					// to know whether the event was actually canceled
					return event.cancelable;
				}
			},
	
			// parse: Function
			//		One can provide a parsing function that will permit the parsing of the data. By
			//		default we assume the provide data is a simple JavaScript array that requires
			//		no parsing (subclass stores may provide their own default parse function)
			parse: null,
	
			// stringify: Function
			//		For stores that serialize data (to send to a server, for example) the stringify
			//		function can be specified to control how objects are serialized to strings
			stringify: null,
	
			// Model: Function
			//		This should be a entity (like a class/constructor) with a 'prototype' property that will be
			//		used as the prototype for all objects returned from this store. One can set
			//		this to the Model from dmodel/Model to return Model objects, or leave this
			//		to null if you don't want any methods to decorate the returned
			//		objects (this can improve performance by avoiding prototype setting),
			Model: null,
	
			_restore: function (object, mutateAllowed) {
				// summary:
				//		Restores a plain raw object, making an instance of the store's model.
				//		This is called when an object had been persisted into the underlying
				//		medium, and is now being restored. Typically restored objects will come
				//		through a phase of deserialization (through JSON.parse, DB retrieval, etc.)
				//		in which their __proto__ will be set to Object.prototype. To provide
				//		data model support, the returned object needs to be an instance of the model.
				//		This can be accomplished by setting __proto__ to the model's prototype
				//		or by creating a new instance of the model, and copying the properties to it.
				//		Also, model's can provide their own restore method that will allow for
				//		custom model-defined behavior. However, one should be aware that copying
				//		properties is a slower operation than prototype assignment.
				//		The restore process is designed to be distinct from the create process
				//		so their is a clear delineation between new objects and restored objects.
				// object: Object
				//		The raw object with the properties that need to be defined on the new
				//		model instance
				// mutateAllowed: boolean
				//		This indicates if restore is allowed to mutate the original object
				//		(by setting its __proto__). If this isn't true, than the restore should
				//		copy the object to a new object with the correct type.
				// returns: Object
				//		An instance of the store model, with all the properties that were defined
				//		on object. This may or may not be the same object that was passed in.
				var Model = this.Model;
				if (Model && object) {
					var prototype = Model.prototype;
					var restore = prototype._restore;
					if (restore) {
						// the prototype provides its own restore method
						object = restore.call(object, Model, mutateAllowed);
					} else if (hasProto && mutateAllowed) {
						// the fast easy way
						// http://jsperf.com/setting-the-prototype
						object.__proto__ = prototype;
					} else {
						// create a new object with the correct prototype
						object = lang.delegate(prototype, object);
					}
				}
				return object;
			},
	
			create: function (properties) {
				// summary:
				//		This creates a new instance from the store's model.
				//	properties:
				//		The properties that are passed to the model constructor to
				//		be copied onto the new instance. Note, that should only be called
				//		when new objects are being created, not when existing objects
				//		are being restored from storage.
				return new this.Model(properties);
			},
	
			_createSubCollection: function (kwArgs) {
				var newCollection = lang.delegate(this.constructor.prototype);
	
				for (var i in this) {
					if (this._includePropertyInSubCollection(i, newCollection)) {
						newCollection[i] = this[i];
					}
				}
	
				return declare.safeMixin(newCollection, kwArgs);
			},
	
			_includePropertyInSubCollection: function (name, subCollection) {
				return !(name in subCollection) || subCollection[name] !== this[name];
			},
	
			// queryLog: __QueryLogEntry[]
			//		The query operations represented by this collection
			queryLog: [],	// NOTE: It's ok to define this on the prototype because the array instance is never modified
	
			filter: new QueryMethod({
				type: 'filter',
				normalizeArguments: function (filter) {
					var Filter = this.Filter;
					if (filter instanceof Filter) {
						return [filter];
					}
					return [new Filter(filter)];
				}
			}),
	
			Filter: Filter,
	
			sort: new QueryMethod({
				type: 'sort',
				normalizeArguments: function (property, descending) {
					var sorted;
					if (typeof property === 'function') {
						sorted = [ property ];
					} else {
						if (property instanceof Array) {
							sorted = property.slice();
						} else if (typeof property === 'object') {
							sorted = [].slice.call(arguments);
						} else {
							sorted = [{ property: property, descending: descending }];
						}
	
						sorted = arrayUtil.map(sorted, function (sort) {
							// copy the sort object to avoid mutating the original arguments
							sort = lang.mixin({}, sort);
							sort.descending = !!sort.descending;
							return sort;
						});
						// wrap in array because sort objects are a single array argument
						sorted = [ sorted ];
					}
					return sorted;
				}
			}),
	
			select: new QueryMethod({
				type: 'select'
			}),
	
			_getQuerierFactory: function (type) {
				var uppercaseType = type[0].toUpperCase() + type.substr(1);
				return this['_create' + uppercaseType + 'Querier'];
			}
	
	/*====,
			get: function (id) {
				// summary:
				//		Retrieves an object by its identity
				// id: Number
				//		The identity to use to lookup the object
				// returns: Object
				//		The object in the store that matches the given id.
			},
			put: function (object, directives) {
				// summary:
				//		Stores an object
				// object: Object
				//		The object to store.
				// directives: dstore/Store.PutDirectives?
				//		Additional directives for storing objects.
				// returns: Object
				//		The object that was stored, with any changes that were made by
				//		the storage system (like generated id)
			},
			add: function (object, directives) {
				// summary:
				//		Creates an object, throws an error if the object already exists
				// object: Object
				//		The object to store.
				// directives: dstore/Store.PutDirectives?
				//		Additional directives for creating objects.
				// returns: Object
				//		The object that was stored, with any changes that were made by
				//		the storage system (like generated id)
			},
			remove: function (id) {
				// summary:
				//		Deletes an object by its identity
				// id: Number
				//		The identity to use to delete the object
			},
			transaction: function () {
				// summary:
				//		Starts a new transaction.
				//		Note that a store user might not call transaction() prior to using put,
				//		delete, etc. in which case these operations effectively could be thought of
				//		as "auto-commit" style actions.
				// returns: dstore/Store.Transaction
				//		This represents the new current transaction.
			},
			getChildren: function (parent) {
				// summary:
				//		Retrieves the children of an object.
				// parent: Object
				//		The object to find the children of.
				// returns: dstore/Store.Collection
				//		A result set of the children of the parent object.
			}
	====*/
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	
	/*====
		var Collection = declare(null, {
			// summary:
			//		This is an abstract API for a collection of objects, which can be filtered,
			//		sorted, and sliced to create new collections. This is considered to be base
			//		interface for all stores and  query results in dstore. Note that the objects in the
			//		collection may not be immediately retrieved from the underlying data
			//		storage until they are actually accessed through forEach() or fetch().
	
			filter: function (query) {
				// summary:
				//		Filters the collection, returning a new subset collection
				// query: String|Object|Function
				//		The query to use for retrieving objects from the store.
				// returns: Collection
			},
			sort: function (property, descending) {
				// summary:
				//		Sorts the current collection into a new collection, reordering the objects by the provided sort order.
				// property: String|Function
				//		The property to sort on. Alternately a function can be provided to sort with
				// descending?: Boolean
				//		Indicate if the sort order should be descending (defaults to ascending)
				// returns: Collection
			},
			fetchRange: function (kwArgs) {
				// summary:
				//		Retrieves a range of objects from the collection, returning a promise to an array.
				// kwArgs.start: Number
				//		The starting index of objects to return (0-indexed)
				// kwArgs.end: Number
				//		The exclusive end of objects to return
				// returns: Collection
			},
			forEach: function (callback, thisObject) {
				// summary:
				//		Iterates over the query results, based on
				//		https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/forEach.
				//		Note that this may executed asynchronously (in which case it will return a promise),
				//		and the callback may be called after this function returns.
				// callback:
				//		Function that is called for each object in the query results
				// thisObject:
				//		The object to use as |this| in the callback.
				// returns:
				//		undefined|Promise
			},
			fetch: function () {
				// summary:
				//		This can be called to materialize and request the data behind this collection.
				//		Often collections may be lazy, and won't retrieve their underlying data until
				//		forEach or fetch is called. This returns an array, or for asynchronous stores,
				//		this will return a promise, resolving to an array of objects, once the
				//		operation is complete.
				//	returns Array|Promise
			},
			on: function (type, listener) {
				// summary:
				//		This registers a callback for notification of when data is modified in the query results.
				// type: String
				//		There are four types of events defined in this API:
				//		- add - A new object was added
				//		- update - An object was updated
				//		- delete - An object was deleted
				// listener: Function
				//		The listener function is called when objects in the query results are modified
				//		to affect the query result. The listener function is called with a single event object argument:
				//		| listener(event);
				//
				//		- The event object as the following properties:
				//		- type - The event type (of the four above)
				//		- target - This indicates the object that was create or modified.
				//		- id - If an object was removed, this indicates the object that was removed.
				//		The next two properties will only be available if array tracking is employed,
				//		which is usually provided by dstore/Trackable
				//		- previousIndex - The previousIndex parameter indicates the index in the result array where
				//		the object used to be. If the value is -1, then the object is an addition to
				//		this result set (due to a new object being created, or changed such that it
				//		is a part of the result set).
				//		- index - The inex parameter indicates the index in the result array where
				//		the object should be now. If the value is -1, then the object is a removal
				//		from this result set (due to an object being deleted, or changed such that it
				//		is not a part of the result set).
	
			}
		});
	
		Collection.SortInformation = declare(null, {
			// summary:
			//		An object describing what property to sort on, and the direction of the sort.
			// property: String
			//		The name of the property to sort on.
			// descending: Boolean
			//		The direction of the sort.  Default is false.
		});
		Store.Collection = Collection;
	
		Store.PutDirectives = declare(null, {
			// summary:
			//		Directives passed to put() and add() handlers for guiding the update and
			//		creation of stored objects.
			// id: String|Number?
			//		Indicates the identity of the object if a new object is created
			// beforeId: String?
			//		If the collection of objects in the store has a natural ordering,
			//		this indicates that the created or updated object should be placed before the
			//		object whose identity is specified as the value of this property. A value of null indicates that the
			//		object should be last.
			// parent: Object?,
			//		If the store is hierarchical (with single parenting) this property indicates the
			//		new parent of the created or updated object.
			// overwrite: Boolean?
			//		If this is provided as a boolean it indicates that the object should or should not
			//		overwrite an existing object. A value of true indicates that a new object
			//		should not be created, the operation should update an existing object. A
			//		value of false indicates that an existing object should not be updated, a new
			//		object should be created (which is the same as an add() operation). When
			//		this property is not provided, either an update or creation is acceptable.
		});
	
		Store.Transaction = declare(null, {
			// summary:
			//		This is an object returned from transaction() calls that represents the current
			//		transaction.
	
			commit: function () {
				// summary:
				//		Commits the transaction. This may throw an error if it fails. Of if the operation
				//		is asynchronous, it may return a promise that represents the eventual success
				//		or failure of the commit.
			},
			abort: function (callback, thisObject) {
				// summary:
				//		Aborts the transaction. This may throw an error if it fails. Of if the operation
				//		is asynchronous, it may return a promise that represents the eventual success
				//		or failure of the abort.
			}
		});
	
		var __QueryLogEntry = {
			type: String
				The query type
			arguments: Array
				The original query arguments
			normalizedArguments: Array
				The normalized query arguments
			querier: Function?
				A client-side implementation of the query that takes an item array and returns an item array
		};
	====*/


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(46),
		__webpack_require__(47)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(Deferred, Promise){
		"use strict";
	
		// module:
		//		dojo/when
	
		return function when(valueOrPromise, callback, errback, progback){
			// summary:
			//		Transparently applies callbacks to values and/or promises.
			// description:
			//		Accepts promises but also transparently handles non-promises. If no
			//		callbacks are provided returns a promise, regardless of the initial
			//		value. Foreign promises are converted.
			//
			//		If callbacks are provided and the initial value is not a promise,
			//		the callback is executed immediately with no error handling. Returns
			//		a promise if the initial value is a promise, or the result of the
			//		callback otherwise.
			// valueOrPromise:
			//		Either a regular value or an object with a `then()` method that
			//		follows the Promises/A specification.
			// callback: Function?
			//		Callback to be invoked when the promise is resolved, or a non-promise
			//		is received.
			// errback: Function?
			//		Callback to be invoked when the promise is rejected.
			// progback: Function?
			//		Callback to be invoked when the promise emits a progress update.
			// returns: dojo/promise/Promise
			//		Promise, or if a callback is provided, the result of the callback.
	
			var receivedPromise = valueOrPromise && typeof valueOrPromise.then === "function";
			var nativePromise = receivedPromise && valueOrPromise instanceof Promise;
	
			if(!receivedPromise){
				if(arguments.length > 1){
					return callback ? callback(valueOrPromise) : valueOrPromise;
				}else{
					return new Deferred().resolve(valueOrPromise);
				}
			}else if(!nativePromise){
				var deferred = new Deferred(valueOrPromise.cancel);
				valueOrPromise.then(deferred.resolve, deferred.reject, deferred.progress);
				valueOrPromise = deferred.promise;
			}
	
			if(callback || errback || progback){
				return valueOrPromise.then(callback, errback, progback);
			}
			return valueOrPromise;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		/*=====
		var __QueryMethodArgs = {
			// type: String
			//		The type of the query. This identifies the query's type in the query log
			//		and the name of the corresponding query engine method.
			// normalizeArguments: Function?
			//		A function that normalizes arguments for consumption by a query engine
			// applyQuery: Function?
			//		A function that takes the query's new subcollection and the query's log entry
			//		and applies it to the new subcollection. This is useful for collections that need
			//		to both declare and implement new query methods.
			// querierFactory: Function?
			//		A factory function that provides a default querier implementation to use when
			//		a collection does not define its own querier factory method for this query type.
		};
		=====*/
		return function QueryMethod(/*__QueryMethodArgs*/ kwArgs) {
			// summary:
			//		The constructor for a dstore collection query method
			// description:
			//		This is the constructor for a collection query method. It encapsulates the following:
			//		* Creating a new subcollection for the query results
			//		* Logging the query in the collection's `queryLog`
			//		* Normalizing query arguments
			//		* Applying the query engine
			// kwArgs:
			//		The properties that define the query method
			// returns: Function
			//		Returns a function that takes query arguments and returns a new collection with
			//		the query associated with it.
	
			var type = kwArgs.type,
				normalizeArguments = kwArgs.normalizeArguments,
				applyQuery = kwArgs.applyQuery,
				defaultQuerierFactory = kwArgs.querierFactory;
	
			return function () {
				// summary:
				//		A query method whose arguments are determined by the query type
				// returns: dstore/Collection
				//		A collection representing the query results
	
				var originalArguments = Array.prototype.slice.call(arguments),
					normalizedArguments = normalizeArguments
						? normalizeArguments.apply(this, originalArguments)
						: originalArguments,
					logEntry = {
						type: type,
						arguments: originalArguments,
						normalizedArguments: normalizedArguments
					},
					querierFactory = this._getQuerierFactory(type) || defaultQuerierFactory;
	
				if (querierFactory) {
					// Call the query factory in store context to support things like
					// mapping a filter query's string argument to a custom filter method on the collection
					logEntry.querier = querierFactory.apply(this, normalizedArguments);
				}
	
				var newCollection = this._createSubCollection({
					queryLog: this.queryLog.concat(logEntry)
				});
	
				return applyQuery ? applyQuery.call(this, newCollection, logEntry) : newCollection;
			};
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare) {
		// a Filter builder
		function filterCreator(type) {
			// constructs a new filter based on type, used to create each method
			return function newFilter() {
				var Filter = this.constructor;
				var filter = new Filter();
				filter.type = type;
				filter.args = arguments;
				if (this.type) {
					// we are chaining, so combine with an and operator
					return filterCreator('and').call(Filter.prototype, this, filter);
				}
				return filter;
			};
		}
		var Filter = declare(null, {
			constructor: function (filterArg) {
				var argType = typeof filterArg;
				switch (argType) {
					case 'object':
						var filter = this;
						// construct a filter based on the query object
						for (var key in filterArg){
							var value = filterArg[key];
							if (value instanceof this.constructor) {
								// fully construct the filter from the single arg
								filter = filter[value.type](key, value.args[0]);
							} else if (value && value.test) {
								// support regex
								filter = filter.match(key, value);
							} else {
								filter = filter.eq(key, value);
							}
						}
						this.type = filter.type;
						this.args = filter.args;
						break;
					case 'function': case 'string':
						// allow string and function args as well
						this.type = argType;
						this.args = [filterArg];
				}
			},
			// define our operators
			and: filterCreator('and'),
			or: filterCreator('or'),
			eq: filterCreator('eq'),
			ne: filterCreator('ne'),
			lt: filterCreator('lt'),
			lte: filterCreator('lte'),
			gt: filterCreator('gt'),
			gte: filterCreator('gte'),
			contains: filterCreator('contains'),
			'in': filterCreator('in'),
			match: filterCreator('match')
		});
		Filter.filterCreator = filterCreator;
		return Filter;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(8), __webpack_require__(53)], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang, when) {
		function forEach(callback, instance) {
			return when(this, function(data) {
				for (var i = 0, l = data.length; i < l; i++){
					callback.call(instance, data[i], i, data);
				}
			});
		}
		return function (data, options) {
			var hasTotalLength = options && 'totalLength' in options;
			if(data.then) {
				data = lang.delegate(data);
				// a promise for the eventual realization of the totalLength, in
				// case it comes from the resolved data
				var totalLengthPromise = data.then(function (data) {
					// calculate total length, now that we have access to the resolved data
					var totalLength = hasTotalLength ? options.totalLength :
							data.totalLength || data.length;
					// make it available on the resolved data
					data.totalLength = totalLength;
					// don't return the totalLength promise unless we need to, to avoid
					// triggering a lazy promise
					return !hasTotalLength && totalLength;
				});
				// make the totalLength available on the promise (whether through the options or the enventual
				// access to the resolved data)
				data.totalLength = hasTotalLength ? options.totalLength : totalLengthPromise;
				// make the response available as well
				data.response = options && options.response;
			} else {
				data.totalLength = hasTotalLength ? options.totalLength : data.length;
			}
	
			data.forEach = forEach;
	
			return data;
		};
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(28),
		__webpack_require__(53),
		__webpack_require__(1),
		__webpack_require__(8),
		__webpack_require__(52),
		__webpack_require__(58),
		__webpack_require__(56)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (arrayUtil, when, declare, lang, Store, Memory, QueryResults) {
	
		// module:
		//		dstore/Cache
	
	
		function cachingQuery(type) {
			// ensure querying creates a parallel caching store query
			return function () {
				var subCollection = this.inherited(arguments);
				var cachingCollection = this.cachingCollection || this.cachingStore;
				subCollection.cachingCollection = cachingCollection[type].apply(cachingCollection, arguments);
				subCollection.isValidFetchCache = this.canCacheQuery === true || this.canCacheQuery(type, arguments);
				return subCollection;
			};
		}
	
		function init (store) {
			if (!store.cachingStore) {
				store.cachingStore = new Memory();
			}
	
			store.cachingStore.Model = store.Model;
			store.cachingStore.idProperty = store.idProperty;
		}
		var CachePrototype = {
			cachingStore: null,
			constructor: function () {
				init(this);
			},
			canCacheQuery: function (method, args) {
				// summary:
				//		Indicates if a queried (filter, sort, etc.) collection should using caching
				return false;
			},
			isAvailableInCache: function () {
				// summary:
				//		Indicates if the collection's cachingCollection is a viable source
				//		for a fetch
				return (this.isValidFetchCache && (this.allLoaded || this.fetchRequest)) ||
						this._parent && this._parent.isAvailableInCache();
			},
			fetch: function () {
				return this._fetch(arguments);
			},
			fetchRange: function () {
				return this._fetch(arguments, true);
			},
			_fetch: function (args, isRange) {
				// if the data is available in the cache (via any parent), we use fetch from the caching store
				var cachingStore = this.cachingStore;
				var cachingCollection = this.cachingCollection || cachingStore;
				var store = this;
				var available = this.isAvailableInCache();
				if (available) {
					return new QueryResults(when(available, function () {
						// need to double check to make sure the flag hasn't been cleared
						// and we really have all data loaded
						if (store.isAvailableInCache()) {
							return isRange ?
								cachingCollection.fetchRange(args[0]) :
								cachingCollection.fetch();
						} else {
							return store.inherited(args);
						}
					}));
				}
				var results = this.fetchRequest = this.inherited(args);
				when(results, function (results) {
					var allLoaded = !isRange;
					store.fetchRequest = null;
					// store each object before calling the callback
					arrayUtil.forEach(results, function (object) {
						// store each object before calling the callback
						if (!store.isLoaded || store.isLoaded(object)) {
							cachingStore.put(object);
						} else {
							// if anything is not loaded, we can't consider them all loaded
							allLoaded = false;
						}
					});
					if (allLoaded) {
						store.allLoaded = true;
					}
	
					return results;
				});
				return results;
			},
			// TODO: for now, all forEach() calls delegate to fetch(), but that may be different
			// with IndexedDB, so we may need to intercept forEach as well (and hopefully not
			// double load elements.
			// isValidFetchCache: boolean
			//		This flag indicates if a previous fetch can be used as a cache for subsequent
			//		fetches (in this collection, or downstream).
			isValidFetchCache: false,
			get: function (id, directives) {
				var cachingStore = this.cachingStore;
				var masterGet = this.getInherited(arguments);
				var masterStore = this;
				// if everything is being loaded, we always wait for that to finish
				return when(this.fetchRequest, function () {
					return when(cachingStore.get(id), function (result) {
						if (result !== undefined) {
							return result;
						} else if (masterGet) {
							return when(masterGet.call(masterStore, id, directives), function (result) {
								if (result) {
									cachingStore.put(result, {id: id});
								}
								return result;
							});
						}
					});
				});
			},
			add: function (object, directives) {
				var cachingStore = this.cachingStore;
				return when(this.inherited(arguments), function (result) {
					// now put result in cache (note we don't do add, because add may have
					// called put() and already added it)
					var cachedPutResult =
						cachingStore.put(object && typeof result === 'object' ? result : object, directives);
					// the result from the add should be dictated by the master store and be unaffected by the cachingStore,
					// unless the master store doesn't implement add
					return result || cachedPutResult;
				});
			},
			put: function (object, directives) {
				// first remove from the cache, so it is empty until we get a response from the master store
				var cachingStore = this.cachingStore;
				cachingStore.remove((directives && directives.id) || this.getIdentity(object));
				return when(this.inherited(arguments), function (result) {
					// now put result in cache
					var cachedPutResult =
						cachingStore.put(object && typeof result === 'object' ? result : object, directives);
					// the result from the put should be dictated by the master store and be unaffected by the cachingStore,
					// unless the master store doesn't implement put
					return result || cachedPutResult;
				});
			},
			remove: function (id, directives) {
				var cachingStore = this.cachingStore;
				return when(this.inherited(arguments), function (result) {
					return when(cachingStore.remove(id, directives), function () {
						return result;
					});
				});
			},
			evict: function (id) {
				// summary:
				//		Evicts an object from the cache
				// any eviction means that we don't have everything loaded anymore
				this.allLoaded = false;
				return this.cachingStore.remove(id);
			},
			invalidate: function () {
				// summary:
				//		Invalidates this collection's cache as being a valid source of
				//		future fetches
				this.allLoaded = false;
			},
			_createSubCollection: function () {
				var subCollection = this.inherited(arguments);
				subCollection._parent = this;
				return subCollection;
			},
	
			sort: cachingQuery('sort'),
			filter: cachingQuery('filter'),
	
			_getQuerierFactory: function (type) {
				var cachingStore = this.cachingStore;
				return this.inherited(arguments) || lang.hitch(cachingStore, cachingStore._getQuerierFactory(type));
			}
		};
		var Cache = declare(null, CachePrototype);
		Cache.create = function (target, properties) {
			// create a delegate of an existing store with caching
			// functionality mixed in
			target = declare.safeMixin(lang.delegate(target), CachePrototype);
			declare.safeMixin(target, properties);
			// we need to initialize it since the constructor won't have been called
			init(target);
			return target;
		};
		return Cache;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(8),
		__webpack_require__(28),
		__webpack_require__(52),
		__webpack_require__(59),
		__webpack_require__(60),
		__webpack_require__(56)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, lang, arrayUtil, Store, Promised, SimpleQuery, QueryResults) {
	
		// module:
		//		dstore/Memory
		return declare([Store, Promised, SimpleQuery ], {
			constructor: function () {
				// summary:
				//		Creates a memory object store.
				// options: dstore/Memory
				//		This provides any configuration information that will be mixed into the store.
				//		This should generally include the data property to provide the starting set of data.
	
				// Add a version property so subcollections can detect when they're using stale data
				this.storage.version = 0;
			},
	
			postscript: function () {
				this.inherited(arguments);
	
				// Set the data in `postscript` so subclasses can override `data` in their constructors
				// (e.g., a LocalStorage store that retrieves its data from localStorage)
				this.setData(this.data || []);
			},
	
			// data: Array
			//		The array of all the objects in the memory store
			data: null,
	
			autoEmitEvents: false, // this is handled by the methods themselves
	
			getSync: function (id) {
				// summary:
				//		Retrieves an object by its identity
				// id: Number
				//		The identity to use to lookup the object
				// returns: Object
				//		The object in the store that matches the given id.
				return this.storage.fullData[this.storage.index[id]];
			},
			putSync: function (object, options) {
				// summary:
				//		Stores an object
				// object: Object
				//		The object to store.
				// options: dstore/Store.PutDirectives?
				//		Additional metadata for storing the data.  Includes an 'id'
				//		property if a specific id is to be used.
				// returns: Number
	
				options = options || {};
	
				var storage = this.storage,
					index = storage.index,
					data = storage.fullData;
	
				var Model = this.Model;
				if (Model && !(object instanceof Model)) {
					// if it is not the correct type, restore a
					// properly typed version of the object. Note that we do not allow
					// mutation here
					object = this._restore(object);
				}
				var id = this.getIdentity(object);
				if (id == null) {
					this._setIdentity(object, ('id' in options) ? options.id : Math.random());
					id = this.getIdentity(object);
				}
				storage.version++;
	
				var eventType = id in index ? 'update' : 'add',
					event = { target: object },
					previousIndex,
					defaultDestination;
				if (eventType === 'update') {
					if (options.overwrite === false) {
						throw new Error('Object already exists');
					} else {
						data.splice(previousIndex = index[id], 1);
						defaultDestination = previousIndex;
					}
				} else {
					defaultDestination = this.defaultNewToStart ? 0 : data.length;
				}
	
				var destination;
				if ('beforeId' in options) {
					var beforeId = options.beforeId;
	
					if (beforeId === null) {
						destination = data.length;
					} else {
						destination = index[beforeId];
	
						// Account for the removed item
						if (previousIndex < destination) {
							--destination;
						}
					}
	
					if (destination !== undefined) {
						event.beforeId = beforeId;
					} else {
						console.error('options.beforeId was specified but no corresponding index was found');
						destination = defaultDestination;
					}
				} else {
					destination = defaultDestination;
				}
				data.splice(destination, 0, object);
	
				// the fullData has been changed, so the index needs updated
				var i = isFinite(previousIndex) ? Math.min(previousIndex, destination) : destination;
				for (var l = data.length; i < l; ++i) {
					index[this.getIdentity(data[i])] = i;
				}
	
				this.emit(eventType, event);
	
				return object;
			},
			addSync: function (object, options) {
				// summary:
				//		Creates an object, throws an error if the object already exists
				// object: Object
				//		The object to store.
				// options: dstore/Store.PutDirectives?
				//		Additional metadata for storing the data.  Includes an 'id'
				//		property if a specific id is to be used.
				// returns: Number
				(options = options || {}).overwrite = false;
				// call put with overwrite being false
				return this.putSync(object, options);
			},
			removeSync: function (id) {
				// summary:
				//		Deletes an object by its identity
				// id: Number
				//		The identity to use to delete the object
				// returns: Boolean
				//		Returns true if an object was removed, falsy (undefined) if no object matched the id
				var storage = this.storage;
				var index = storage.index;
				var data = storage.fullData;
				if (id in index) {
					var removed = data.splice(index[id], 1)[0];
					// now we have to reindex
					this._reindex();
					this.emit('delete', {id: id, target: removed});
					return true;
				}
			},
			setData: function (data) {
				// summary:
				//		Sets the given data as the source for this store, and indexes it
				// data: Object[]
				//		An array of objects to use as the source of data. Note that this
				//		array will not be copied, it is used directly and mutated as
				//		data changes.
	
				if (this.parse) {
					data = this.parse(data);
				}
				if (data.items) {
					// just for convenience with the data format ItemFileReadStore expects
					this.idProperty = data.identifier || this.idProperty;
					data = data.items;
				}
				var storage = this.storage;
				storage.fullData = this.data = data;
				this._reindex();
			},
	
			_reindex: function () {
				var storage = this.storage;
				var index = storage.index = {};
				var data = storage.fullData;
				var Model = this.Model;
				var ObjectPrototype = Object.prototype;
				for (var i = 0, l = data.length; i < l; i++) {
					var object = data[i];
					if (Model && !(object instanceof Model)) {
						var restoredObject = this._restore(object,
								// only allow mutation if it is a plain object
								// (which is generally the expected input),
								// if "typed" objects are actually passed in, we will
								// respect that, and leave the original alone
								object.__proto__ === ObjectPrototype);
						if (object !== restoredObject) {
							// a new object was generated in the restoration process,
							// so we have to update the item in the data array.
							data[i] = object = restoredObject;
						}
					}
					index[this.getIdentity(object)] = i;
				}
				storage.version++;
			},
	
			fetchSync: function () {
				var data = this.data;
				if (!data || data._version !== this.storage.version) {
					// our data is absent or out-of-date, so we requery from the root
					// start with the root data
					data = this.storage.fullData;
					var queryLog = this.queryLog;
					// iterate through the query log, applying each querier
					for (var i = 0, l = queryLog.length; i < l; i++) {
						data = queryLog[i].querier(data);
					}
					// store it, with the storage version stamp
					data._version = this.storage.version;
					this.data = data;
				}
				return new QueryResults(data);
			},
	
			fetchRangeSync: function (kwArgs) {
				var data = this.fetchSync(),
					start = kwArgs.start,
					end = kwArgs.end;
				return new QueryResults(data.slice(start, end), {
					totalLength: data.length
				});
			},
	
			_includePropertyInSubCollection: function (name) {
				return name !== 'data' && this.inherited(arguments);
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(46),
		__webpack_require__(56),
		__webpack_require__(53)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, Deferred, QueryResults, when) {
		// module:
		//		this is a mixin that can be used to provide async methods,
		// 		by implementing their sync counterparts
		function promised(method, query) {
			return function() {
				var deferred = new Deferred();
				try {
					deferred.resolve(this[method].apply(this, arguments));
				} catch (error) {
					deferred.reject(error);
				}
				if (query) {
					// need to create a QueryResults and ensure the totalLength is
					// a promise.
					var queryResults = new QueryResults(deferred.promise);
					queryResults.totalLength = when(queryResults.totalLength);
					return queryResults;
				}
				return deferred.promise;
			};
		}
		return declare(null, {
			get: promised('getSync'),
			put: promised('putSync'),
			add: promised('addSync'),
			remove: promised('removeSync'),
			fetch: promised('fetchSync', true),
			fetchRange: promised('fetchRangeSync', true)
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(28)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, arrayUtil) {
	
		// module:
		//		dstore/SimpleQuery
	
		function makeGetter(property, queryAccessors) {
			if (property.indexOf('.') > -1) {
				var propertyPath = property.split('.');
				var pathLength = propertyPath.length;
				return function (object) {
					for (var i = 0; i < pathLength; i++) {
						object = object && (queryAccessors && object.get ? object.get(propertyPath[i]) : object[propertyPath[i]]);
					}
					return object;
				};
			}
			// else
			return function (object) {
				return object.get ? object.get(property) : object[property];
			};
		}
	
		var comparators = {
			eq: function (value, required) {
				return value === required;
			},
			'in': function(value, required) {
				// allow for a collection of data
				return arrayUtil.indexOf(required.data || required, value) > -1;
			},
			ne: function (value, required) {
				return value !== required;
			},
			lt: function (value, required) {
				return value < required;
			},
			lte: function (value, required) {
				return value <= required;
			},
			gt: function (value, required) {
				return value > required;
			},
			gte: function (value, required) {
				return value >= required;
			},
			match: function (value, required, object) {
				return required.test(value, object);
			},
			contains: function (value, required, object, key) {
				var collection = this;
				return arrayUtil.every(required.data || required, function (requiredValue) {
					if (typeof requiredValue === 'object' && requiredValue.type) {
						var comparator = collection._getFilterComparator(requiredValue.type);
						return arrayUtil.some(value, function (item) {
							return comparator.call(collection, item, requiredValue.args[1], object, key);
						});
					}
					return arrayUtil.indexOf(value, requiredValue) > -1;
				});
			}
		};
	
		return declare(null, {
			// summary:
			//		Mixin providing querier factories for core query types
	
			_createFilterQuerier: function (filter) {
				// create our matching filter function
				var queryAccessors = this.queryAccessors;
				var collection = this;
				var querier = getQuerier(filter);
	
				function getQuerier(filter) {
					var type = filter.type;
					var args = filter.args;
					var comparator = collection._getFilterComparator(type);
					if (comparator) {
						// it is a comparator
						var firstArg = args[0];
						var getProperty = makeGetter(firstArg, queryAccessors);
						var secondArg = args[1];
						if (secondArg && secondArg.fetchSync) {
							// if it is a collection, fetch the contents (for `in` and `contains` operators)
							secondArg = secondArg.fetchSync();
						}
						return function (object) {
							// get the value for the property and compare to expected value
							return comparator.call(collection, getProperty(object), secondArg, object, firstArg);
						};
					}
					switch (type) {
						case 'and': case 'or':
							for (var i = 0, l = args.length; i < l; i++) {
								// combine filters, using and or or
								var nextQuerier = getQuerier(args[i]);
								if (querier) {
									// combine the last querier with a new one
									querier = (function(a, b) {
										return type === 'and' ?
											function(object) {
												return a(object) && b(object);
											} :
											function(object) {
												return a(object) || b(object);
	
											};
									})(querier, nextQuerier);
								} else {
									querier = nextQuerier;
								}
							}
							return querier;
						case 'function':
							return args[0];
						case 'string':
							// named filter
							var filterFunction = collection[args[0]];
							if (!filterFunction) {
								throw new Error('No filter function ' + args[0] + ' was found in the collection');
							}
							return filterFunction;
						case undefined:
							return function () {
								return true;
							};
						default:
							throw new Error('Unknown filter operation "' + type + '"');
					}
				}
				return function (data) {
					return arrayUtil.filter(data, querier);
				};
			},
	
			_getFilterComparator: function (type) {
				// summary:
				//		Get the comparator for the specified type
				// returns: Function?
	
				return comparators[type] || this.inherited(arguments);
			},
	
			_createSelectQuerier: function (properties) {
				return function (data) {
					var l = properties.length;
					return arrayUtil.map(data, properties instanceof Array ?
						// array of properties
						function (object) {
							var selectedObject = {};
							for (var i = 0; i < l; i++) {
								var property = properties[i];
								selectedObject[property] = object[property];
							}
							return selectedObject;
						} :
						// single property
						function (object) {
							return object[properties];
						});
				};
			},
	
			_createSortQuerier: function (sorted) {
				var queryAccessors = this.queryAccessors;
				return function (data) {
					data = data.slice();
					data.sort(typeof sorted == 'function' ? sorted : function (a, b) {
						for (var i = 0; i < sorted.length; i++) {
							var comparison;
							var sorter = sorted[i];
							if (typeof sorter == 'function') {
								comparison = sorter(a, b);
							} else {
								var getProperty = sorter.get || (sorter.get = makeGetter(sorter.property, queryAccessors));
								var descending = sorter.descending;
								var aValue = getProperty(a);
								var bValue = getProperty(b);
	
								aValue != null && (aValue = aValue.valueOf());
								bValue != null && (bValue = bValue.valueOf());
								if (aValue === bValue) {
									comparison = 0;
								}
								else {
									// Prioritize undefined > null > defined
									var isALessThanB = typeof bValue === 'undefined' ||
										bValue === null && typeof aValue !== 'undefined' ||
										aValue != null && aValue < bValue;
									comparison = Boolean(descending) === isALessThanB ? 1 : -1;
								}
							}
	
							if (comparison !== 0) {
								return comparison;
							}
						}
						return 0;
					});
					return data;
				};
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(10),
		__webpack_require__(62)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, Grid, OnDemandList) {
		return declare([ Grid, OnDemandList ], {});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(29),
		__webpack_require__(63),
		__webpack_require__(1),
		__webpack_require__(8),
		__webpack_require__(11),
		__webpack_require__(18),
		__webpack_require__(53),
		__webpack_require__(30)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (List, _StoreMixin, declare, lang, domConstruct, on, when, miscUtil) {
	
		return declare([ List, _StoreMixin ], {
			// summary:
			//		Extends List to include virtual scrolling functionality, querying a
			//		dojo/store instance for the appropriate range when the user scrolls.
	
			// minRowsPerPage: Integer
			//		The minimum number of rows to request at one time.
			minRowsPerPage: 25,
	
			// maxRowsPerPage: Integer
			//		The maximum number of rows to request at one time.
			maxRowsPerPage: 250,
	
			// maxEmptySpace: Integer
			//		Defines the maximum size (in pixels) of unrendered space below the
			//		currently-rendered rows. Setting this to less than Infinity can be useful if you
			//		wish to limit the initial vertical scrolling of the grid so that the scrolling is
			// 		not excessively sensitive. With very large grids of data this may make scrolling
			//		easier to use, albiet it can limit the ability to instantly scroll to the end.
			maxEmptySpace: Infinity,
	
			// bufferRows: Integer
			//	  The number of rows to keep ready on each side of the viewport area so that the user can
			//	  perform local scrolling without seeing the grid being built. Increasing this number can
			//	  improve perceived performance when the data is being retrieved over a slow network.
			bufferRows: 10,
	
			// farOffRemoval: Integer
			//		Defines the minimum distance (in pixels) from the visible viewport area
			//		rows must be in order to be removed.  Setting to Infinity causes rows
			//		to never be removed.
			farOffRemoval: 2000,
	
			// queryRowsOverlap: Integer
			//		Indicates the number of rows to overlap queries. This helps keep
			//		continuous data when underlying data changes (and thus pages don't
			//		exactly align)
			queryRowsOverlap: 0,
	
			// pagingMethod: String
			//		Method (from dgrid/util/misc) to use to either throttle or debounce
			//		requests.  Default is "debounce" which will cause the grid to wait until
			//		the user pauses scrolling before firing any requests; can be set to
			//		"throttleDelayed" instead to progressively request as the user scrolls,
			//		which generally incurs more overhead but might appear more responsive.
			pagingMethod: 'debounce',
	
			// pagingDelay: Integer
			//		Indicates the delay (in milliseconds) imposed upon pagingMethod, to wait
			//		before paging in more data on scroll events. This can be increased to
			//		reduce client-side overhead or the number of requests sent to a server.
			pagingDelay: miscUtil.defaultDelay,
	
			// keepScrollPosition: Boolean
			//		When refreshing the list, controls whether the scroll position is
			//		preserved, or reset to the top.  This can also be overridden for
			//		specific calls to refresh.
			keepScrollPosition: false,
	
			// rowHeight: Number
			//		Average row height, computed in renderQuery during the rendering of
			//		the first range of data.
			rowHeight: 0,
	
			postCreate: function () {
				this.inherited(arguments);
				var self = this;
				// check visibility on scroll events
				on(this.bodyNode, 'scroll',
					miscUtil[this.pagingMethod](function (event) {
						self._processScroll(event);
					}, null, this.pagingDelay)
				);
			},
	
			destroy: function () {
				this.inherited(arguments);
				if (this._refreshTimeout) {
					clearTimeout(this._refreshTimeout);
				}
			},
	
			renderQuery: function (query, options) {
				// summary:
				//		Creates a preload node for rendering a query into, and executes the query
				//		for the first page of data. Subsequent data will be downloaded as it comes
				//		into view.
				// query: Function
				//		Function to be called when requesting new data.
				// options: Object?
				//		Optional object containing the following:
				//		* container: Container to build preload nodes within; defaults to this.contentNode
	
				var self = this,
					container = (options && options.container) || this.contentNode,
					preload = {
						query: query,
						count: 0
					},
					preloadNode,
					priorPreload = this.preload;
	
				// Initial query; set up top and bottom preload nodes
				var topPreload = {
					node: domConstruct.create('div', {
						className: 'dgrid-preload',
						style: { height: '0' }
					}, container),
					count: 0,
					query: query,
					next: preload
				};
				topPreload.node.rowIndex = 0;
				preload.node = preloadNode = domConstruct.create('div', {
					className: 'dgrid-preload'
				}, container);
				preload.previous = topPreload;
	
				// this preload node is used to represent the area of the grid that hasn't been
				// downloaded yet
				preloadNode.rowIndex = this.minRowsPerPage;
	
				if (priorPreload) {
					// the preload nodes (if there are multiple) are represented as a linked list, need to insert it
					if ((preload.next = priorPreload.next) &&
							// is this preload node below the prior preload node?
							preloadNode.offsetTop >= priorPreload.node.offsetTop) {
						// the prior preload is above/before in the linked list
						preload.previous = priorPreload;
					}
					else {
						// the prior preload is below/after in the linked list
						preload.next = priorPreload;
						preload.previous = priorPreload.previous;
					}
					// adjust the previous and next links so the linked list is proper
					preload.previous.next = preload;
					preload.next.previous = preload;
				}
				else {
					this.preload = preload;
				}
	
				var loadingNode = domConstruct.create('div', {
						className: 'dgrid-loading'
					}, preloadNode, 'before'),
					innerNode = domConstruct.create('div', {
						className: 'dgrid-below'
					}, loadingNode);
				innerNode.innerHTML = this.loadingMessage;
	
				// Establish query options, mixing in our own.
				options = lang.mixin({ start: 0, count: this.minRowsPerPage },
					'level' in query ? { queryLevel: query.level } : null);
	
				// Protect the query within a _trackError call, but return the resulting collection
				return this._trackError(function () {
					var results = query(options);
	
					// Render the result set
					return self.renderQueryResults(results, preloadNode, options).then(function (trs) {
						return results.totalLength.then(function (total) {
							var trCount = trs.length,
								parentNode = preloadNode.parentNode,
								noDataNode = self.noDataNode;
	
							if (self._rows) {
								self._rows.min = 0;
								self._rows.max = trCount === total ? Infinity : trCount - 1;
							}
	
							domConstruct.destroy(loadingNode);
							if (!('queryLevel' in options)) {
								self._total = total;
							}
							// now we need to adjust the height and total count based on the first result set
							if (total === 0 && parentNode) {
								if (noDataNode) {
									domConstruct.destroy(noDataNode);
									delete self.noDataNode;
								}
								self.noDataNode = noDataNode = domConstruct.create('div', {
									className: 'dgrid-no-data',
									innerHTML: self.noDataMessage
								});
								parentNode.insertBefore(noDataNode, self._getFirstRowSibling(parentNode));
							}
							var height = 0;
							for (var i = 0; i < trCount; i++) {
								height += self._calcRowHeight(trs[i]);
							}
							// only update rowHeight if we actually got results and are visible
							if (trCount && height) {
								self.rowHeight = height / trCount;
							}
	
							total -= trCount;
							preload.count = total;
							preloadNode.rowIndex = trCount;
							if (total) {
								preloadNode.style.height = Math.min(total * self.rowHeight, self.maxEmptySpace) + 'px';
							}
							else {
								preloadNode.style.display = 'none';
							}
	
							if (self._previousScrollPosition) {
								// Restore position after a refresh operation w/ keepScrollPosition
								self.scrollTo(self._previousScrollPosition);
								delete self._previousScrollPosition;
							}
	
							// Redo scroll processing in case the query didn't fill the screen,
							// or in case scroll position was restored
							return when(self._processScroll()).then(function () {
								return trs;
							});
						});
					}).otherwise(function (err) {
						// remove the loadingNode and re-throw
						domConstruct.destroy(loadingNode);
						throw err;
					});
				});
			},
	
			refresh: function (options) {
				// summary:
				//		Refreshes the contents of the grid.
				// options: Object?
				//		Optional object, supporting the following parameters:
				//		* keepScrollPosition: like the keepScrollPosition instance property;
				//			specifying it in the options here will override the instance
				//			property's value for this specific refresh call only.
	
				var self = this,
					keep = (options && options.keepScrollPosition);
	
				// Fall back to instance property if option is not defined
				if (typeof keep === 'undefined') {
					keep = this.keepScrollPosition;
				}
	
				// Store scroll position to be restored after new total is received
				if (keep) {
					this._previousScrollPosition = this.getScrollPosition();
				}
	
				this.inherited(arguments);
				if (this._renderedCollection) {
					// render the query
	
					// renderQuery calls _trackError internally
					return this.renderQuery(function (queryOptions) {
						return self._renderedCollection.fetchRange({
							start: queryOptions.start,
							end: queryOptions.start + queryOptions.count
						});
					}).then(function () {
						// Emit on a separate turn to enable event to be used consistently for
						// initial render, regardless of whether the backing store is async
						self._refreshTimeout = setTimeout(function () {
							on.emit(self.domNode, 'dgrid-refresh-complete', {
								bubbles: true,
								cancelable: false,
								grid: self
							});
							self._refreshTimeout = null;
						}, 0);
					});
				}
			},
	
			resize: function () {
				this.inherited(arguments);
				this._processScroll();
			},
	
			cleanup: function () {
				this.inherited(arguments);
				this.preload = null;
			},
	
			renderQueryResults: function (results) {
				var rows = this.inherited(arguments);
				var collection = this._renderedCollection;
	
				if (collection && collection.releaseRange) {
					rows.then(function (resolvedRows) {
						if (resolvedRows[0] && !resolvedRows[0].parentNode.tagName) {
							// Release this range, since it was never actually rendered;
							// need to wait until totalLength promise resolves, since
							// Trackable only adds the range then to begin with
							results.totalLength.then(function () {
								collection.releaseRange(resolvedRows[0].rowIndex,
									resolvedRows[resolvedRows.length - 1].rowIndex + 1);
							});
						}
					});
				}
	
				return rows;
			},
	
			_getFirstRowSibling: function (container) {
				// summary:
				//		Returns the DOM node that a new row should be inserted before
				//		when there are no other rows in the current result set.
				//		In the case of OnDemandList, this will always be the last child
				//		of the container (which will be a trailing preload node).
				return container.lastChild;
			},
	
			_calcRowHeight: function (rowElement) {
				// summary:
				//		Calculate the height of a row. This is a method so it can be overriden for
				//		plugins that add connected elements to a row, like the tree
	
				var sibling = rowElement.nextSibling;
	
				// If a next row exists, compare the top of this row with the
				// next one (in case "rows" are actually rendering side-by-side).
				// If no next row exists, this is either the last or only row,
				// in which case we count its own height.
				if (sibling && !/\bdgrid-preload\b/.test(sibling.className)) {
					return sibling.offsetTop - rowElement.offsetTop;
				}
	
				return rowElement.offsetHeight;
			},
	
			lastScrollTop: 0,
			_processScroll: function (evt) {
				// summary:
				//		Checks to make sure that everything in the viewable area has been
				//		downloaded, and triggering a request for the necessary data when needed.
	
				if (!this.rowHeight) {
					return;
				}
	
				var grid = this,
					scrollNode = grid.bodyNode,
					// grab current visible top from event if provided, otherwise from node
					visibleTop = (evt && evt.scrollTop) || this.getScrollPosition().y,
					visibleBottom = scrollNode.offsetHeight + visibleTop,
					priorPreload, preloadNode, preload = grid.preload,
					lastScrollTop = grid.lastScrollTop,
					requestBuffer = grid.bufferRows * grid.rowHeight,
					searchBuffer = requestBuffer - grid.rowHeight, // Avoid rounding causing multiple queries
					// References related to emitting dgrid-refresh-complete if applicable
					lastRows,
					preloadSearchNext = true;
	
				// XXX: I do not know why this happens.
				// munging the actual location of the viewport relative to the preload node by a few pixels in either
				// direction is necessary because at least WebKit on Windows seems to have an error that causes it to
				// not quite get the entire element being focused in the viewport during keyboard navigation,
				// which means it becomes impossible to load more data using keyboard navigation because there is
				// no more data to scroll to to trigger the fetch.
				// 1 is arbitrary and just gets it to work correctly with our current test cases; don’t wanna go
				// crazy and set it to a big number without understanding more about what is going on.
				// wondering if it has to do with border-box or something, but changing the border widths does not
				// seem to make it break more or less, so I do not know…
				var mungeAmount = 1;
	
				grid.lastScrollTop = visibleTop;
	
				function removeDistantNodes(preload, distanceOff, traversal, below) {
					// we check to see the the nodes are "far off"
					var farOffRemoval = grid.farOffRemoval,
						preloadNode = preload.node;
					// by checking to see if it is the farOffRemoval distance away
					if (distanceOff > 2 * farOffRemoval) {
						// there is a preloadNode that is far off;
						// remove rows until we get to in the current viewport
						var row;
						var nextRow = preloadNode[traversal];
						var reclaimedHeight = 0;
						var count = 0;
						var toDelete = [];
						var firstRowIndex = nextRow && nextRow.rowIndex;
						var lastRowIndex;
	
						while ((row = nextRow)) {
							var rowHeight = grid._calcRowHeight(row);
							if (reclaimedHeight + rowHeight + farOffRemoval > distanceOff ||
									(nextRow.className.indexOf('dgrid-row') < 0 &&
										nextRow.className.indexOf('dgrid-loading') < 0)) {
								// we have reclaimed enough rows or we have gone beyond grid rows
								break;
							}
	
							nextRow = row[traversal];
							reclaimedHeight += rowHeight;
							count += row.count || 1;
							// Just do cleanup here, as we will do a more efficient node destruction in a setTimeout below
							grid.removeRow(row, true);
							toDelete.push(row);
	
							if ('rowIndex' in row) {
								lastRowIndex = row.rowIndex;
							}
						}
	
						if (grid._renderedCollection.releaseRange &&
								typeof firstRowIndex === 'number' && typeof lastRowIndex === 'number') {
							// Note that currently child rows in Tree structures are never unrendered;
							// this logic will need to be revisited when that is addressed.
	
							// releaseRange is end-exclusive, and won't remove anything if start >= end.
							if (below) {
								grid._renderedCollection.releaseRange(lastRowIndex, firstRowIndex + 1);
							}
							else {
								grid._renderedCollection.releaseRange(firstRowIndex, lastRowIndex + 1);
							}
	
							grid._rows[below ? 'max' : 'min'] = lastRowIndex;
							if (grid._rows.max >= grid._total - 1) {
								grid._rows.max = Infinity;
							}
						}
						// now adjust the preloadNode based on the reclaimed space
						preload.count += count;
						if (below) {
							preloadNode.rowIndex -= count;
							adjustHeight(preload);
						}
						else {
							// if it is above, we can calculate the change in exact row changes,
							// which we must do to not mess with the scroll position
							preloadNode.style.height = (preloadNode.offsetHeight + reclaimedHeight) + 'px';
						}
						// we remove the elements after expanding the preload node so that
						// the contraction doesn't alter the scroll position
						var trashBin = document.createElement('div');
						for (var i = toDelete.length; i--;) {
							trashBin.appendChild(toDelete[i]);
						}
						setTimeout(function () {
							// we can defer the destruction until later
							domConstruct.destroy(trashBin);
						}, 1);
					}
				}
	
				function adjustHeight(preload, noMax) {
					preload.node.style.height = Math.min(preload.count * grid.rowHeight,
						noMax ? Infinity : grid.maxEmptySpace) + 'px';
				}
				function traversePreload(preload, moveNext) {
					// Skip past preloads that are not currently connected
					do {
						preload = moveNext ? preload.next : preload.previous;
					} while (preload && !preload.node.offsetWidth);
					return preload;
				}
				while (preload && !preload.node.offsetWidth) {
					// skip past preloads that are not currently connected
					preload = preload.previous;
				}
				// there can be multiple preloadNodes (if they split, or multiple queries are created),
				//	so we can traverse them until we find whatever is in the current viewport, making
				//	sure we don't backtrack
				while (preload && preload !== priorPreload) {
					priorPreload = grid.preload;
					grid.preload = preload;
					preloadNode = preload.node;
					var preloadTop = preloadNode.offsetTop;
					var preloadHeight;
	
					if (visibleBottom + mungeAmount + searchBuffer < preloadTop) {
						// the preload is below the line of sight
						preload = traversePreload(preload, (preloadSearchNext = false));
					}
					else if (visibleTop - mungeAmount - searchBuffer >
							(preloadTop + (preloadHeight = preloadNode.offsetHeight))) {
						// the preload is above the line of sight
						preload = traversePreload(preload, (preloadSearchNext = true));
					}
					else {
						// the preload node is visible, or close to visible, better show it
						var offset = ((preloadNode.rowIndex ? visibleTop - requestBuffer :
							visibleBottom) - preloadTop) / grid.rowHeight;
						var count = (visibleBottom - visibleTop + 2 * requestBuffer) / grid.rowHeight;
						// utilize momentum for predictions
						var momentum = Math.max(
							Math.min((visibleTop - lastScrollTop) * grid.rowHeight, grid.maxRowsPerPage / 2),
							grid.maxRowsPerPage / -2);
						count += Math.min(Math.abs(momentum), 10);
						if (preloadNode.rowIndex === 0) {
							// at the top, adjust from bottom to top
							offset -= count;
						}
						offset = Math.max(offset, 0);
						if (offset < 10 && offset > 0 && count + offset < grid.maxRowsPerPage) {
							// connect to the top of the preloadNode if possible to avoid excessive adjustments
							count += Math.max(0, offset);
							offset = 0;
						}
						count = Math.min(Math.max(count, grid.minRowsPerPage),
											grid.maxRowsPerPage, preload.count);
	
						if (count === 0) {
							preload = traversePreload(preload, preloadSearchNext);
							continue;
						}
	
						count = Math.ceil(count);
						offset = Math.min(Math.floor(offset), preload.count - count);
	
						var options = {};
						preload.count -= count;
						var beforeNode = preloadNode,
							keepScrollTo, queryRowsOverlap = grid.queryRowsOverlap,
							below = (preloadNode.rowIndex > 0 || preloadNode.offsetTop > visibleTop) && preload;
						if (below) {
							// add new rows below
							var previous = preload.previous;
							if (previous) {
								removeDistantNodes(previous,
									visibleTop - (previous.node.offsetTop + previous.node.offsetHeight),
									'nextSibling');
								if (offset > 0 && previous.node === preloadNode.previousSibling) {
									// all of the nodes above were removed
									offset = Math.min(preload.count, offset);
									preload.previous.count += offset;
									adjustHeight(preload.previous, true);
									preloadNode.rowIndex += offset;
									queryRowsOverlap = 0;
								}
								else {
									count += offset;
								}
								preload.count -= offset;
							}
							options.start = preloadNode.rowIndex - queryRowsOverlap;
							options.count = Math.min(count + queryRowsOverlap, grid.maxRowsPerPage);
							preloadNode.rowIndex = options.start + options.count;
						}
						else {
							// add new rows above
							if (preload.next) {
								// remove out of sight nodes first
								removeDistantNodes(preload.next, preload.next.node.offsetTop - visibleBottom,
									'previousSibling', true);
								beforeNode = preloadNode.nextSibling;
								if (beforeNode === preload.next.node) {
									// all of the nodes were removed, can position wherever we want
									preload.next.count += preload.count - offset;
									preload.next.node.rowIndex = offset + count;
									adjustHeight(preload.next);
									preload.count = offset;
									queryRowsOverlap = 0;
								}
								else {
									keepScrollTo = true;
								}
	
							}
							options.start = preload.count;
							options.count = Math.min(count + queryRowsOverlap, grid.maxRowsPerPage);
						}
						if (keepScrollTo && beforeNode && beforeNode.offsetWidth) {
							keepScrollTo = beforeNode.offsetTop;
						}
	
						adjustHeight(preload);
	
						// use the query associated with the preload node to get the next "page"
						if ('level' in preload.query) {
							options.queryLevel = preload.query.level;
						}
	
						// Avoid spurious queries (ideally this should be unnecessary...)
						if (!('queryLevel' in options) && (options.start > grid._total || options.count < 0)) {
							continue;
						}
	
						// create a loading node as a placeholder while the data is loaded
						var loadingNode = domConstruct.create('div', {
							className: 'dgrid-loading',
							style: { height: count * grid.rowHeight + 'px' }
						}, beforeNode, 'before');
						domConstruct.create('div', {
							className: 'dgrid-' + (below ? 'below' : 'above'),
							innerHTML: grid.loadingMessage
						}, loadingNode);
						loadingNode.count = count;
	
						// Query now to fill in these rows.
						grid._trackError(function () {
							// Use function to isolate the variables in case we make multiple requests
							// (which can happen if we need to render on both sides of an island of already-rendered rows)
							(function (loadingNode, below, keepScrollTo) {
								/* jshint maxlen: 122 */
								var rangeResults = preload.query(options);
								lastRows = grid.renderQueryResults(rangeResults, loadingNode, options).then(function (rows) {
									var gridRows = grid._rows;
									if (gridRows && !('queryLevel' in options) && rows.length) {
										// Update relevant observed range for top-level items
										if (below) {
											if (gridRows.max <= gridRows.min) {
												// All rows were removed; update start of rendered range as well
												gridRows.min = rows[0].rowIndex;
											}
											gridRows.max = rows[rows.length - 1].rowIndex;
										}
										else {
											if (gridRows.max <= gridRows.min) {
												// All rows were removed; update end of rendered range as well
												gridRows.max = rows[rows.length - 1].rowIndex;
											}
											gridRows.min = rows[0].rowIndex;
										}
									}
	
									// can remove the loading node now
									beforeNode = loadingNode.nextSibling;
									domConstruct.destroy(loadingNode);
									// beforeNode may have been removed if the query results loading node was removed
									// as a distant node before rendering
									if (keepScrollTo && beforeNode && beforeNode.offsetWidth) {
										// if the preload area above the nodes is approximated based on average
										// row height, we may need to adjust the scroll once they are filled in
										// so we don't "jump" in the scrolling position
										var pos = grid.getScrollPosition();
										grid.scrollTo({
											// Since we already had to query the scroll position,
											// include x to avoid TouchScroll querying it again on its end.
											x: pos.x,
											y: pos.y + beforeNode.offsetTop - keepScrollTo,
											// Don't kill momentum mid-scroll (for TouchScroll only).
											preserveMomentum: true
										});
									}
	
									rangeResults.totalLength.then(function (total) {
										if (!('queryLevel' in options)) {
											grid._total = total;
											if (grid._rows && grid._rows.max >= grid._total - 1) {
												grid._rows.max = Infinity;
											}
										}
										if (below) {
											// if it is below, we will use the total from the collection to update
											// the count of the last preload in case the total changes as
											// later pages are retrieved
	
											// recalculate the count
											below.count = total - below.node.rowIndex;
											// readjust the height
											adjustHeight(below);
										}
									});
	
									// make sure we have covered the visible area
									grid._processScroll();
									return rows;
								}, function (e) {
									domConstruct.destroy(loadingNode);
									throw e;
								});
							})(loadingNode, below, keepScrollTo);
						});
	
						preload = preload.previous;
	
					}
				}
	
				// return the promise from the last render
				return lastRows;
			}
		});
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(1),
		__webpack_require__(8),
		__webpack_require__(46),
		__webpack_require__(19),
		__webpack_require__(11),
		__webpack_require__(4),
		__webpack_require__(18),
		__webpack_require__(53)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (declare, lang, Deferred, aspect, domConstruct, has, on, when) {
		// This module isolates the base logic required by store-aware list/grid
		// components, e.g. OnDemandList/Grid and the Pagination extension.
	
		function emitError(err) {
			// called by _trackError in context of list/grid, if an error is encountered
			if (typeof err !== 'object') {
				// Ensure we actually have an error object, so we can attach a reference.
				err = new Error(err);
			}
			else if (err.dojoType === 'cancel') {
				// Don't fire dgrid-error events for errors due to canceled requests
				// (unfortunately, the Deferred instrumentation will still log them)
				return;
			}
	
			var event = on.emit(this.domNode, 'dgrid-error', {
				grid: this,
				error: err,
				cancelable: true,
				bubbles: true
			});
			if (event) {
				console.error(err);
			}
		}
	
		return declare(null, {
			// collection: Object
			//		The base object collection (implementing the dstore/api/Store API) before being sorted
			//		or otherwise processed by the grid. Use it for general purpose store operations such as
			//		`getIdentity` and `get`, `add`, `put`, and `remove`.
			collection: null,
	
			// _renderedCollection: Object
			//		The object collection from which data is to be fetched. This is the sorted collection.
			//		Use it when retrieving data to be rendered by the grid.
			_renderedCollection: null,
	
			// _rows: Array
			//		Sparse array of row nodes, used to maintain the grid in response to events from a tracked collection.
			//		Each node's index corresponds to the index of its data object in the collection.
			_rows: null,
	
			// _observerHandle: Object
			//		The observer handle for the current collection, if trackable.
			_observerHandle: null,
	
			// shouldTrackCollection: Boolean
			//		Whether this instance should track any trackable collection it is passed.
			shouldTrackCollection: true,
	
			// getBeforePut: boolean
			//		If true, a get request will be performed to the store before each put
			//		as a baseline when saving; otherwise, existing row data will be used.
			getBeforePut: true,
	
			// noDataMessage: String
			//		Message to be displayed when no results exist for a collection, whether at
			//		the time of the initial query or upon subsequent observed changes.
			//		Defined by _StoreMixin, but to be implemented by subclasses.
			noDataMessage: '',
	
			// loadingMessage: String
			//		Message displayed when data is loading.
			//		Defined by _StoreMixin, but to be implemented by subclasses.
			loadingMessage: '',
	
			_total: 0,
	
			constructor: function () {
				// Create empty objects on each instance, not the prototype
				this.dirty = {};
				this._updating = {}; // Tracks rows that are mid-update
				this._columnsWithSet = {};
	
				// Reset _columnsWithSet whenever column configuration is reset
				aspect.before(this, 'configStructure', lang.hitch(this, function () {
					this._columnsWithSet = {};
				}));
			},
	
			destroy: function () {
				this.inherited(arguments);
	
				if (this._renderedCollection) {
					this._cleanupCollection();
				}
			},
	
			_configColumn: function (column) {
				// summary:
				//		Implements extension point provided by Grid to store references to
				//		any columns with `set` methods, for use during `save`.
				if (column.set) {
					this._columnsWithSet[column.field] = column;
				}
				this.inherited(arguments);
			},
	
			_setCollection: function (collection) {
				// summary:
				//		Assigns a new collection to the list/grid, sets up tracking
				//		if applicable, and tells the list/grid to refresh.
	
				if (this._renderedCollection) {
					this.cleanup();
					this._cleanupCollection({
						// Only clear the dirty hash if the collection being used is actually from a different store
						// (i.e. not just a re-sorted / re-filtered version of the same store)
						shouldRevert: !collection || collection.storage !== this._renderedCollection.storage
					});
				}
	
				this.collection = collection;
	
				// Avoid unnecessary rendering and processing before the grid has started up
				if (this._started) {
					// Once startup is called, List.startup sets the sort property which calls _StoreMixin._applySort
					// which sets the collection property again.  So _StoreMixin._applySort will be executed again
					// after startup is called.
					if (collection) {
						var renderedCollection = collection;
						if (this.sort && this.sort.length > 0) {
							renderedCollection = collection.sort(this.sort);
						}
	
						if (renderedCollection.track && this.shouldTrackCollection) {
							renderedCollection = renderedCollection.track();
							this._rows = [];
	
							this._observerHandle = this._observeCollection(
								renderedCollection,
								this.contentNode,
								{ rows: this._rows }
							);
						}
	
						this._renderedCollection = renderedCollection;
					}
					this.refresh();
				}
			},
	
			_setStore: function () {
				if (!this.collection) {
					console.debug('set(\'store\') call detected, but you probably meant set(\'collection\')');
				}
			},
	
			_getTotal: function () {
				// summary:
				//		Retrieves the currently-tracked total (as updated by
				//		subclasses after store queries, or by _StoreMixin in response to
				//		updated totalLength in events)
	
				return this._total;
			},
	
			_cleanupCollection: function (options) {
				// summary:
				//		Handles cleanup duty for the previous collection;
				//		called during _setCollection and destroy.
				// options: Object?
				//		* shouldRevert: Whether to clear the dirty hash
	
				options = options || {};
	
				if (this._renderedCollection.tracking) {
					this._renderedCollection.tracking.remove();
				}
	
				// Remove observer and existing rows so any sub-row observers will be cleaned up
				if (this._observerHandle) {
					this._observerHandle.remove();
					this._observerHandle = this._rows = null;
				}
	
				// Discard dirty map, as it applied to a previous collection
				if (options.shouldRevert !== false) {
					this.dirty = {};
				}
	
				this._renderedCollection = this.collection = null;
			},
	
			_applySort: function () {
				if (this.collection) {
					this.set('collection', this.collection);
				}
				else if (this.store) {
					console.debug('_StoreMixin found store property but not collection; ' +
						'this is often the sign of a mistake during migration from 0.3 to 0.4');
				}
			},
	
			row: function () {
				// Extend List#row with more appropriate lookup-by-id logic
				var row = this.inherited(arguments);
				if (row && row.data && typeof row.id !== 'undefined') {
					row.id = this.collection.getIdentity(row.data);
				}
				return row;
			},
	
			refresh: function () {
				var result = this.inherited(arguments);
	
				if (!this.collection) {
					this.noDataNode = domConstruct.create('div', {
						className: 'dgrid-no-data',
						innerHTML: this.noDataMessage
					}, this.contentNode);
				}
	
				return result;
			},
	
			refreshCell: function (cell) {
				this.inherited(arguments);
				var row = cell.row;
				var self = this;
	
				if (!this.collection || !this._createBodyRowCell) {
					throw new Error('refreshCell requires a Grid with a collection.');
				}
	
				return this.collection.get(row.id).then(function (item) {
					var cellElement = cell.element;
					if (cellElement.widget) {
						cellElement.widget.destroyRecursive();
					}
					domConstruct.empty(cellElement);
	
					var dirtyItem = self.dirty && self.dirty[row.id];
					if (dirtyItem) {
						item = lang.delegate(item, dirtyItem);
					}
	
					self._createBodyRowCell(cellElement, cell.column, item);
				});
			},
	
			renderArray: function () {
				var rows = this.inherited(arguments);
	
				if (!this.collection) {
					if (rows.length && this.noDataNode) {
						domConstruct.destroy(this.noDataNode);
					}
				}
				return rows;
			},
	
			insertRow: function (object, parent, beforeNode, i, options) {
				var store = this.collection,
					dirty = this.dirty,
					id = store && store.getIdentity(object),
					dirtyObj,
					row;
	
				if (id in dirty && !(id in this._updating)) {
					dirtyObj = dirty[id];
				}
				if (dirtyObj) {
					// restore dirty object as delegate on top of original object,
					// to provide protection for subsequent changes as well
					object = lang.delegate(object, dirtyObj);
				}
	
				row = this.inherited(arguments);
	
				if (options && options.rows) {
					options.rows[i] = row;
				}
	
				// Remove no data message when a new row appears.
				// Run after inherited logic to prevent confusion due to noDataNode
				// no longer being present as a sibling.
				if (this.noDataNode) {
					domConstruct.destroy(this.noDataNode);
					this.noDataNode = null;
				}
	
				return row;
			},
	
			updateDirty: function (id, field, value) {
				// summary:
				//		Updates dirty data of a field for the item with the specified ID.
				var dirty = this.dirty,
					dirtyObj = dirty[id];
	
				if (!dirtyObj) {
					dirtyObj = dirty[id] = {};
				}
				dirtyObj[field] = value;
			},
	
			save: function () {
				// Keep track of the store and puts
				var self = this,
					store = this.collection,
					dirty = this.dirty,
					dfd = new Deferred(),
					results = {},
					getFunc = function (id) {
						// returns a function to pass as a step in the promise chain,
						// with the id variable closured
						var data;
						return (self.getBeforePut || !(data = self.row(id).data)) ?
							function () {
								return store.get(id);
							} :
							function () {
								return data;
							};
					};
	
				// function called within loop to generate a function for putting an item
				function putter(id, dirtyObj) {
					// Return a function handler
					return function (object) {
						var colsWithSet = self._columnsWithSet,
							updating = self._updating,
							key, data;
	
						if (typeof object.set === 'function') {
							object.set(dirtyObj);
						} else {
							// Copy dirty props to the original, applying setters if applicable
							for (key in dirtyObj) {
								object[key] = dirtyObj[key];
							}
						}
	
						// Apply any set methods in column definitions.
						// Note that while in the most common cases column.set is intended
						// to return transformed data for the key in question, it is also
						// possible to directly modify the object to be saved.
						for (key in colsWithSet) {
							data = colsWithSet[key].set(object);
							if (data !== undefined) {
								object[key] = data;
							}
						}
	
						updating[id] = true;
						// Put it in the store, returning the result/promise
						return store.put(object).then(function (result) {
							// Clear the item now that it's been confirmed updated
							delete dirty[id];
							delete updating[id];
							results[id] = result;
							return results;
						});
					};
				}
	
				var promise = dfd.then(function () {
					// Ensure empty object is returned even if nothing was dirty, for consistency
					return results;
				});
	
				// For every dirty item, grab the ID
				for (var id in dirty) {
					// Create put function to handle the saving of the the item
					var put = putter(id, dirty[id]);
	
					// Add this item onto the promise chain,
					// getting the item from the store first if desired.
					promise = promise.then(getFunc(id)).then(put);
				}
	
				// Kick off and return the promise representing all applicable get/put ops.
				// If the success callback is fired, all operations succeeded; otherwise,
				// save will stop at the first error it encounters.
				dfd.resolve();
				return promise;
			},
	
			revert: function () {
				// summary:
				//		Reverts any changes since the previous save.
				this.dirty = {};
				this.refresh();
			},
	
			_trackError: function (func) {
				// summary:
				//		Utility function to handle emitting of error events.
				// func: Function|String
				//		A function which performs some store operation, or a String identifying
				//		a function to be invoked (sans arguments) hitched against the instance.
				//		If sync, it can return a value, but may throw an error on failure.
				//		If async, it should return a promise, which would fire the error
				//		callback on failure.
				// tags:
				//		protected
	
				if (typeof func === 'string') {
					func = lang.hitch(this, func);
				}
	
				var self = this,
					promise;
	
				try {
					promise = when(func());
				} catch (err) {
					// report sync error
					var dfd = new Deferred();
					dfd.reject(err);
					promise = dfd.promise;
				}
	
				promise.otherwise(function (err) {
					emitError.call(self, err);
				});
				return promise;
			},
	
			removeRow: function (rowElement, preserveDom, options) {
				var row = {element: rowElement};
				// Check to see if we are now empty...
				if (!preserveDom && this.noDataMessage &&
						(this.up(row).element === rowElement) &&
						(this.down(row).element === rowElement)) {
					// ...we are empty, so show the no data message.
					this.noDataNode = domConstruct.create('div', {
						className: 'dgrid-no-data',
						innerHTML: this.noDataMessage
					}, this.contentNode);
				}
	
				var rows = (options && options.rows) || this._rows;
				if (rows) {
					delete rows[rowElement.rowIndex];
				}
	
				return this.inherited(arguments);
			},
	
			renderQueryResults: function (results, beforeNode, options) {
				// summary:
				//		Renders objects from QueryResults as rows, before the given node.
	
				options = lang.mixin({ rows: this._rows }, options);
				var self = this;
	
				if (!has('dojo-built')) {
					// Check for null/undefined totalResults to help diagnose faulty services/stores
					results.totalLength.then(function (total) {
						if (total == null) {
							console.warn('Store reported null or undefined totalLength. ' +
								'Make sure your store (and service, if applicable) are reporting total correctly!');
						}
					});
				}
	
				return results.then(function (resolvedResults) {
					var resolvedRows = self.renderArray(resolvedResults, beforeNode, options);
					delete self._lastCollection; // used only for non-store List/Grid
					return resolvedRows;
				});
			},
	
			_observeCollection: function (collection, container, options) {
				var self = this,
					rows = options.rows,
					row;
	
				var handles = [
					collection.on('delete, update', function (event) {
						var from = event.previousIndex;
						var to = event.index;
	
						if (from !== undefined && rows[from]) {
							if ('max' in rows && (to === undefined || to < rows.min || to > rows.max)) {
								rows.max--;
							}
	
							row = rows[from];
	
							// check to make the sure the node is still there before we try to remove it
							// (in case it was moved to a different place in the DOM)
							if (row.parentNode === container) {
								self.removeRow(row, false, options);
							}
	
							// remove the old slot
							rows.splice(from, 1);
	
							if (event.type === 'delete' ||
									(event.type === 'update' && (from < to || to === undefined))) {
								// adjust the rowIndex so adjustRowIndices has the right starting point
								rows[from] && rows[from].rowIndex--;
							}
						}
						if (event.type === 'delete') {
							// Reset row in case this is later followed by an add;
							// only update events should retain the row variable below
							row = null;
						}
					}),
	
					collection.on('add, update', function (event) {
						var from = event.previousIndex;
						var to = event.index;
						var nextNode;
	
						function advanceNext() {
							nextNode = (nextNode.connected || nextNode).nextSibling;
						}
	
						// When possible, restrict observations to the actually rendered range
						if (to !== undefined && (!('max' in rows) || (to >= rows.min && to <= rows.max))) {
							if ('max' in rows && (from === undefined || from < rows.min || from > rows.max)) {
								rows.max++;
							}
							// Add to new slot (either before an existing row, or at the end)
							// First determine the DOM node that this should be placed before.
							if (rows.length) {
								nextNode = rows[to];
								if (!nextNode) {
									nextNode = rows[to - 1];
									if (nextNode) {
										// Make sure to skip connected nodes, so we don't accidentally
										// insert a row in between a parent and its children.
										advanceNext();
									}
								}
							}
							else {
								// There are no rows.  Allow for subclasses to insert new rows somewhere other than
								// at the end of the parent node.
								nextNode = self._getFirstRowSibling && self._getFirstRowSibling(container);
							}
							// Make sure we don't trip over a stale reference to a
							// node that was removed, or try to place a node before
							// itself (due to overlapped queries)
							if (row && nextNode && row.id === nextNode.id) {
								advanceNext();
							}
							if (nextNode && !nextNode.parentNode) {
								nextNode = document.getElementById(nextNode.id);
							}
							rows.splice(to, 0, undefined);
							row = self.insertRow(event.target, container, nextNode, to, options);
							self.highlightRow(row);
						}
						// Reset row so it doesn't get reused on the next event
						row = null;
					}),
	
					collection.on('add, delete, update', function (event) {
						var from = (typeof event.previousIndex !== 'undefined') ? event.previousIndex : Infinity,
							to = (typeof event.index !== 'undefined') ? event.index : Infinity,
							adjustAtIndex = Math.min(from, to);
						from !== to && rows[adjustAtIndex] && self.adjustRowIndices(rows[adjustAtIndex]);
	
						// the removal of rows could cause us to need to page in more items
						if (from !== Infinity && self._processScroll && (rows[from] || rows[from - 1])) {
							self._processScroll();
						}
	
						// Fire _onNotification, even for out-of-viewport notifications,
						// since some things may still need to update (e.g. Pagination's status/navigation)
						self._onNotification(rows, event, collection);
	
						// Update _total after _onNotification so that it can potentially
						// decide whether to perform actions based on whether the total changed
						if (collection === self._renderedCollection && 'totalLength' in event) {
							self._total = event.totalLength;
						}
					})
				];
	
				return {
					remove: function () {
						while (handles.length > 0) {
							handles.pop().remove();
						}
					}
				};
			},
	
			_onNotification: function () {
				// summary:
				//		Protected method called whenever a store notification is observed.
				//		Intended to be extended as necessary by mixins/extensions.
				// rows: Array
				//		A sparse array of row nodes corresponding to data objects in the collection.
				// event: Object
				//		The notification event
				// collection: Object
				//		The collection that the notification is relevant to.
				//		Useful for distinguishing child-level from top-level notifications.
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 64 */,
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
		__webpack_require__(8),
		__webpack_require__(1),
		__webpack_require__(9),
		__webpack_require__(34),
		__webpack_require__(30)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function (lang, declare, has, query, miscUtil) {
		return declare(null, {
			// summary:
			//		Extension allowing for specification of columns with additional
			//		header rows spanning multiple columns for strictly display purposes.
			//		Only works on `columns` arrays, not `columns` objects or `subRows`
			//		(nor ColumnSets).
			// description:
			//		CompoundColumns allows nested header cell configurations, wherein the
			//		higher-level headers may span multiple columns and are for
			//		display purposes only.
			//		These nested header cells are configured using a special recursive
			//		`children` property in the column definition, where only the deepest
			//		children are ultimately rendered in the grid as actual columns.
			//		In addition, the deepest child columns may be rendered without
			//		individual headers by specifying `showChildHeaders: false` on the parent.
	
			configStructure: function () {
				// create a set of sub rows for the header row so we can do compound columns
				// the first row is a special spacer row
				var columns = (this.subRows && this.subRows[0]) || this.columns,
					headerRows = [[]],
					topHeaderRow = headerRows[0],
					contentColumns = [];
				// This first row is spacer row that will be made invisible (zero height)
				// with CSS, but it must be rendered as the first row since that is what
				// the table layout is driven by.
				headerRows[0].className = 'dgrid-spacer-row';
	
				function processColumns(columns, level, hasLabel, parent) {
					var numColumns = 0,
						noop = function () {},
						children,
						hasChildLabels;
	
					function processColumn(column, i) {
						// Handle the column config when it is an object rather
						// than an array.
						if (typeof column === 'string') {
							column = {label: column};
						}
						if (!(columns instanceof Array) && !column.field) {
							column.field = i;
						}
						children = column.children;
						hasChildLabels = children && (column.showChildHeaders !== false);
						// Set a reference to the parent column so later the children's ids can
						// be updated to indicate the parent-child relationship.
						column.parentColumn = parent;
						if (children) {
							// it has children
							// make sure the column has an id
							if (column.id == null) {
								column.id = ((parent && parent.id) || level - 1) + '-' + topHeaderRow.length;
							}
							else if (parent && parent.id) {
								// Make sure nested compound columns have ids that are prefixed with
								// their parent's ids.
								column.id = parent.id + '-' + column.id;
							}
						}
						else {
							// it has no children, it is a normal header, add it to the content columns
							contentColumns.push(column);
							// add each one to the first spacer header row for proper layout of the header cells
							topHeaderRow.push(lang.delegate(column, {renderHeaderCell: noop}));
							numColumns++;
						}
						if (!hasChildLabels) {
							// create a header version of the column where we can define a specific rowSpan
							// we define the rowSpan as a negative, the number of levels less than the
							// total number of rows, which we don't know yet
							column = lang.delegate(column, {rowSpan: -level});
						}
	
						if (children) {
							// Recursively process the children; this is specifically
							// performed *after* any potential lang.delegate calls
							// so the parent reference will receive additional info
							numColumns += (column.colSpan =
								processColumns(children, level + 1, hasChildLabels, column));
						}
	
						// add the column to the header rows at the appropriate level
						if (hasLabel) {
							(headerRows[level] || (headerRows[level] = [])).push(column);
						}
					}
	
					miscUtil.each(columns, processColumn, this);
					return numColumns;
				}
	
				processColumns(columns, 1, true);
	
				var numHeaderRows = headerRows.length,
					i, j, headerRow, headerColumn;
				// Now go back through and increase the rowSpans of the headers to be
				// total rows minus the number of levels they are at.
				for (i = 0; i < numHeaderRows; i++) {
					headerRow = headerRows[i];
					for (j = 0; j < headerRow.length; j++) {
						headerColumn = headerRow[j];
						if (headerColumn.rowSpan < 1) {
							headerColumn.rowSpan += numHeaderRows;
						}
					}
				}
				// we need to set this to be used for subRows, so we make it a single row
				contentColumns = [contentColumns];
				// set our header rows so that the grid will use the alternate header row
				// configuration for rendering the headers
				contentColumns.headerRows = headerRows;
				this.subRows = contentColumns;
				this.inherited(arguments);
			},
	
			renderHeader: function () {
				var i,
					columns = this.subRows[0],
					headerColumns = this.subRows.headerRows[0];
	
				this.inherited(arguments);
	
				// The object delegation performed in configStructure unfortunately
				// "protects" the original column definition objects (referenced by
				// columns and subRows) from obtaining headerNode information, so
				// copy them back in.
				for (i = columns.length; i--;) {
					columns[i].headerNode = headerColumns[i].headerNode;
				}
			},
	
			_findSortArrowParent: function () {
				var parent = this.inherited(arguments),
					spacerRow = query('.dgrid-spacer-row', this.headerNode)[0],
					columnId,
					nodes;
	
				if (parent && spacerRow.contains(parent)) {
					columnId = parent.columnId;
					nodes = query('.dgrid-column-' + columnId, this.headerNode);
					return nodes[nodes.length - 1];
				}
			},
	
			_configColumn: function (column, rowColumns, prefix) {
				// Updates the id on a column definition that is a child to include
				// the parent's id.
				var parent = column.parentColumn;
				var columnId = column.id;
				if (parent) {
					// Adjust the id to incorporate the parent's id.
					// Remove the prefix if it was used to create the id
					var id = columnId.indexOf(prefix) === 0 ? columnId.substring(prefix.length) : columnId;
					prefix = parent.id + '-';
					columnId = column.id = prefix + id;
				}
				this.inherited(arguments, [column, rowColumns, prefix]);
			},
	
			cell: function (target, columnId) {
				// summary:
				//		Get the cell object by node, event, or id, plus a columnId.
				//		This extension prefixes children's column ids with the parents' column ids,
				//		so cell takes that into account when looking for a column id.
	
				if (typeof columnId !== 'object') {
					// Find the columnId that corresponds with the provided id.
					// The provided id may be a suffix of the actual id.
					var column = this.column(columnId);
					if (column) {
						columnId = column.id;
					}
				}
				return this.inherited(arguments, [target, columnId]);
			},
	
			column: function (target) {
				// summary:
				//		Get the column object by node, event, or column id.  Take into account parent column id
				//		prefixes that may be added by this extension.
				var results = this.inherited(arguments);
				if (results == null && typeof target !== 'object') {
					// Find a column id that ends with the provided column id.  This will locate a child column
					// by an id that was provided in the original column configuration.  For example, if a compound column
					// was given the id "compound" and a child column was given the id "child", this will find the column
					// using only "child".  If "compound-child" was being searched for, the inherited call
					// above would have found the cell.
					var suffix = '-' + target,
						suffixLength = suffix.length;
					for (var completeId in this.columns) {
						if (completeId.indexOf(suffix, completeId.length - suffixLength) !== -1) {
							return this.columns[completeId];
						}
					}
				}
				return results;
			},
	
			_updateCompoundHiddenStates: function (id, hidden) {
				// summary:
				//		Called from _hideColumn and _showColumn (for ColumnHider)
				//		to adjust parent header cells
	
				var column = this.columns[id],
					colSpan;
	
				if (column && column.hidden === hidden) {
					// Avoid redundant processing (since it would cause colSpan skew)
					return;
				}
	
				// column will be undefined when this is called for parents
				while (column && column.parentColumn) {
					// Update colSpans / hidden state of parents
					column = column.parentColumn;
					colSpan = column.colSpan = column.colSpan + (hidden ? -1 : 1);
	
					if (colSpan) {
						column.headerNode.colSpan = colSpan;
					}
					if (colSpan === 1 && !hidden) {
						this._showColumn(column.id);
					}
					else if (!colSpan && hidden) {
						this._hideColumn(column.id);
					}
				}
			},
	
			_hideColumn: function (id) {
				var self = this;
	
				this._updateCompoundHiddenStates(id, true);
				this.inherited(arguments);
	
				if (has('ff')) {
					// Firefox causes display quirks in certain situations;
					// avoid them by forcing reflow of the header
					this.headerNode.style.display = 'none';
					setTimeout(function () {
						self.headerNode.style.display = '';
						self.resize();
					}, 0);
				}
			},
	
			_showColumn: function (id) {
				this._updateCompoundHiddenStates(id, false);
				this.inherited(arguments);
			},
	
			_getResizedColumnWidths: function () {
				// Overrides ColumnResizer method to report the total width and
				// last column correctly for CompoundColumns structures
	
				var total = 0,
					columns = this.columns,
					id;
	
				for (id in columns) {
					total += columns[id].headerNode.offsetWidth;
				}
	
				return {
					totalWidth: total,
					lastColId: this.subRows[0][this.subRows[0].length - 1].id
				};
			}
		});
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ]);
//# sourceMappingURL=dgrid_04_comp_col.bundle.js.map