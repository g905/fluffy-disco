var stat = document.getElementById("stat");
if(!localStorage["status"]){
    localStorage["status"] = "Изменить статус";
}
stat.innerHTML = localStorage["status"];
var edit_stat = document.getElementById("edit_stat");

(() => {
				const block = document.querySelector('.edit_stat');
				const inp = document.querySelector('.inp');
				const button = document.querySelector('.stat');
				//alert(button);
				function toggle() {
					block.classList.toggle('open');
					inp.focus();
					button.style.opacity = 0.5;
				}
				function remove() {
					block.classList.remove('open');
					button.style.opacity = 1;
				}
				
				document.addEventListener('click', e => {
					const target = e.target;
					
					target === button ? toggle() : (target !== inp) ? remove() : false;

				});
			})();



document.getElementById("stat_save").addEventListener('click', function() {
	if(document.getElementById("div_stat").value == ""){
	} else {
	    localStorage["status"] = document.getElementById("div_stat").value;
    }
	stat.innerHTML = localStorage["status"];
});





var button = document.getElementById('form_submit');
var container = document.getElementById('comment_container');

var xmlhttp = new XMLHttpRequest();
var count;

document.addEventListener('DOMContentLoaded', function() {
  
   xmlhttp.open('post', '../php/ajax.php', true)

    xmlhttp.send("");
	xmlhttp.onreadystatechange = function() {

          if(xmlhttp.readyState == 4){

            if(this.status == 200)
            {
				
				var a = JSON.parse(this.responseText);


                var el = document.getElementById('cont');

                if(a.length == 0){
					count = 0;
					el.innerHTML = "<p>Комментариев нет. Будьте первым."+"</p><br>";
					container.innerHTML = "";
				} else{
					count = a[a.length-1].ID+1;
					el.innerHTML = "";

                    container.innerHTML = "";
                    for (var i = 0; i < a.length; i++){
                    
                    var b = document.createElement("div");
                      b.className = "row comment no-gutters";
                              
                    var col = document.createElement("div");
                      col.className = "col";
                      
                    var close = document.createElement("span");
                      close.className = "close-block";
                      close.innerHTML = "<image src = 'img/close.svg' act = 'del' idd = '" + a[i].ID + "'/>";
                    
                    var upic = document.createElement("div");
                      upic.className = "comment_upic";
                      upic.innerHTML = "<img src = 'img/desktop-assets/hulk.png' alt = 'Картинка комментатора'>";
                    
                    var uname = document.createElement("div");
                      uname.className = "comment_uname";
                      uname.innerHTML = "<p style = 'padding: 0; margin: 0;'><a href = '#'><b>" + a[i].NAME + "</b></a></p><small>" + "Вчера в 16:35" + "</small>";
                      
                    var text = document.createElement("div");
                      text.className = "comment_text";
                      text.innerHTML = "<p>" + a[i].COMMENT + "</p>";
                    
                    col.appendChild(close);
                    col.appendChild(upic);
                    col.appendChild(uname);
                    col.appendChild(text);
                    
                    b.appendChild(col);

                    //container.insertBefore(b, container.firstChild);
                    container.appendChild(b);
				}
				}
			

            }
        }
           
      }
});


button.addEventListener('click', function() {
	//alert('got click');
   var name = document.getElementById('form_name').value.replace(/<[^>]+>/g,''),
       comment = document.getElementById('form_text').value.replace(/<[^>]+>/g,'');
       var val = document.getElementById('valid');
   if(name === '' || comment === '') {
    //alert('Заполните все поля!');
    
    val.innerHTML = "<h1>Заполните все поля!</h1><br>";
    return false;
   }
   val.innerHTML = "";
   xmlhttp.open('post', '../php/ajax.php', true);
   //alert('open');
   xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', 'charset="windows-1251"');
   //alert('header');
   xmlhttp.send("id=" + encodeURIComponent(count) + "&name=" + encodeURIComponent(name) + "&comment=" + encodeURIComponent(comment));
   //alert('sent');
   
   document.getElementById('form_name').value = '';
   document.getElementById('form_text').value = '';
   
  });

function menu(elem){
	
	this.del = function(idd){
		//alert(idd);
		xmlhttp.open('post', '../php/ajax.php', true);
	   //alert('open');
	   xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	   //alert('header');
	   xmlhttp.send("del=true" + "&id=" + encodeURIComponent(idd));

	}
	
	var self = this;
	
	elem.addEventListener('click', function(e) {
      var target = e.target;
      var action = target.getAttribute('act');
      var idd = target.getAttribute('idd');
      if (action) {
        self[action](idd);
      }
    });
	
}

new menu(container);
