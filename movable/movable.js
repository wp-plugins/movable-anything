/* 
blah bla
*/
	var box;
		var deltaX, deltaY;
		var client;
		createClient();
		
		function windowLoaded(evt) {
			// prevent IE text selection while dragging!!! Little-known trick!
			document.body.ondrag = function () { return false; };
			document.body.onselectstart = function () { return false; };
		}
		
		function createClient() {
			try {
				client = window.XMLHttpRequest ? new XMLHttpRequest() : 
									new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { 
				alert("Sorry, your browser is not AJAX-enabled!"); 
			}
		}
		
		function setOpacity(node,val) {
			if (node.filters) {
				try {
					node.filters["alpha"].opacity = val*100;
				} catch (e) { }
			} else if (node.style.opacity) {
				node.style.opacity = val;
			}
		}
		
		function getX(node) {
			return parseInt(node.style.left);
		}
		
		function getY(node) {
			return parseInt(node.style.top);
		}
	
		function getWidth(node) {
			return parseInt(node.style.width);
		}
		
		function getHeight(node) {
			return parseInt(node.style.height);
		}
	
		function setX(node,x) {
			node.style.left = x + "px";
		}
	
		function setY(node,y) {
			node.style.top = y + "px";
		}
	
		function Evt(evt) {
			this.evt = evt ? evt : window.event; 
			this.source = evt.target ? evt.target : evt.srcElement;
			this.x = evt.pageX ? evt.pageX : evt.clientX;
			this.y = evt.pageY ? evt.pageY : evt.clientY;
		}
		
		Evt.prototype.toString = function () {
			return "Evt [ x = " + this.x + ", y = " + this.y + " ]";
		};
		
		Evt.prototype.consume = function () {
			if (this.evt.stopPropagation) {
				this.evt.stopPropagation();
				this.evt.preventDefault();
			} else if (this.evt.cancelBubble) {
				this.evt.cancelBubble = true;
				this.evt.returnValue  = false;
			}
		};
		
		Evt.addEventListener = function (target,type,func,bubbles) {
			if (document.addEventListener) {
				target.addEventListener(type,func,bubbles);
			} else if (document.attachEvent) {
				target.attachEvent("on"+type,func,bubbles);
			} else {
				target["on"+type] = func;
			}
		};
	
		Evt.removeEventListener = function (target,type,func,bubbles) {
			if (document.removeEventListener) {
				target.removeEventListener(type,func,bubbles);
			} else if (document.detachEvent) {
				target.detachEvent("on"+type,func,bubbles);
			} else {
				target["on"+type] = null;
			}
		};
	
		function dragPress(evt) {
			evt = new Evt(evt);
			box = evt.source;
			setOpacity(box,.7);
			deltaX = evt.x - getX(box);
			deltaY = evt.y - getY(box);
			Evt.addEventListener(document,"mousemove",dragMove,false);
			Evt.addEventListener(document,"mouseup",dragRelease,false);
		}
		
		function dragMove(evt) {
			evt = new Evt(evt);
			setX(box,evt.x - deltaX);
			setY(box,evt.y - deltaY);
			evt.consume();
		}
		
		function dragRelease(evt) {
			evt = new Evt(evt);
			setOpacity(box,1);
			Evt.removeEventListener(document,"mousemove",dragMove,false);
			Evt.removeEventListener(document,"mouseup",dragRelease,false);
			if (droppedOnHotSpot(evt)) {
				boxDropped(evt);
			}
		}
