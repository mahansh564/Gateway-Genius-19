var WinWidth, WinHeight;
var ScrollTop;
var MenuActiveCenter;
var HomeHeadTop = 0;
var MenuScrollPercent = 0;
var LogoAnimating = 0;

const MenuActiveDiff = 1;
const MenuActiveHeight = 3.25;
const MaxMenuOpacity = 0.6;


$(document).ready(function(){
	jReady();
	jResize();
});

$(window).resize(function(){
	jResize();
});

function jReady()
{

	$("body, html").scrollTop(0);


	$(".cover").each(function(i){
		$(this).append("<div class='cover-black'></div><div id='particles'></div><div class='cover-bg'></div><div id='cover-down'><i class='material-icons'>keyboard_arrow_down</i></div>");
		$(this).after("<div class='cover-placeholder'></div>");
	});
	particlesJS.load('particles', '/_resource/external/config/particles.json', function(){});
	$("#cover-down").click(function(){
		$("html, body").animate({"scrollTop": WinHeight - $("header").innerHeight()});
	});
	$(".social-mail").html("mail");
	var plxi = 0;
	$(".plx").each(function(){
		$(this).addClass("plx-" + plxi);
		$(this).css({
			"height": $(this).attr("height"),
		}).html(
			"<img src='" + $(this).attr("plx-img") + "' class='plx-img plx-img-" + plxi + "'>"
		); 
		plxi++;
	});
/*	$(".plx").each(function(){
		$(this).css({
			"height": $(this).attr("height"),
			"background-image": "url('" + $(this).attr("plx-img") + "')",
		});
	});*/

	$(".social-container").hover(function(){
		$(this).css({"width": $(this).attr("sc-width")});
	}, function(){
		$(this).css({"width": "4rem"});
	});

	LogoAnimate();
}

function jResize()
{
	WinWidth = $(window).innerWidth();
	WinHeight = $(window).innerHeight();


	// $("#home-cover").css({"height": WinHeight});
}

function jInfinite()
{
	ScrollTop = $(window).scrollTop();

	MenuScrollPercent = Math.min((ScrollTop  / (WinHeight - $("header").innerHeight() - 1)), 1);

	if (MenuScrollPercent >= 1)
	{
		$(".cover").css({
			"position": "fixed",
			"top": "calc(-100% + 4rem)",
			"box-shadow": "0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3)",
		});
		$("#cover-down").fadeOut(100);
	}
	else
	{
		$(".cover").css({
			"position": "absolute",
			"top": "0",
			"box-shadow": "0 4px 5px 0 rgba(0,0,0,0),0 1px 10px 0 rgba(0,0,0,0),0 2px 4px -1px rgba(0,0,0,0)",
		});
		$("#cover-down").fadeIn(100);
		$("#cover-down").css({"opacity": 1 - Math.max(MenuScrollPercent - 0.5, 0)*2});
	}

	$(".cover-black").css({"background-color": "rgba(0,0,0," + (0.2 + Math.max(MenuScrollPercent - 0.5, 0) * 0.4) + ")"});

	plxi = 0;
	$(".plx").each(function(){
		var Plx1, Plx2, Plx3;
		Plx2 = (WinHeight + $(this).innerHeight() - $("header").innerHeight());
		Plx1 = Math.min((Math.max((ScrollTop + WinHeight - $(this).offset().top), 0)), Plx2);
		Plx3 = Plx1 / Plx2;

		$(".plx-img-" + plxi).css({
			"transform": "translateY(" +
				-Plx3 * Math.max(($(".plx-img-" + plxi).innerHeight() - $(".plx-" + plxi).innerHeight()), 0)
			+ "px)"
		});

		$(this).css({"max-height": $(".plx-img-" + plxi).innerHeight()});

		plxi++;

	});

	$("#journal #sidebar").css({
		"min-height": Math.max($("#journal #right").innerHeight(), WinHeight)
	});


	requestAnimationFrame(jInfinite);
}


jInfinite();

$(".foot-top a").click(function(){
	$("body, html").animate({"scrollTop": 0});
});

$("header nav a").click(function(e){
	if (($(this).attr("href"))[0] == '#')
	{
		e.preventDefault();
		$("body, html").animate({"scrollTop": $($(this).attr("href")).position().top - $("header nav").innerHeight()});	
	}
});

$("input[type='text'], input[type='email']").change(function(){
	if ($(this).val())
	{ 
		$(".ip-" + $(this).attr('name')).addClass("ip-active-icon");
		$(this).addClass("ip-active-input");
	}
	else
	{
		$(".ip-" + $(this).attr('name')).removeClass("ip-active-icon");
		$(this).removeClass("ip-active-input");
	}
});

$("form[name='contact']").submit(function(event){
	event.preventDefault();
	contact($(this));
});

function contact(el)
{
	var formloc = "form[name='" + el.attr("name") + "'] ";
	var name = $(formloc + "input[name='name']").val();
	var email = $(formloc + "input[name='email']").val();
	var subject = $(formloc + "input[name='subject']").val();
	var message = $(formloc + "textarea").val();
	var captchacode = grecaptcha.getResponse();



	if (name && email && subject && message && captchacode)
	{
		$("form[name='contact']").fadeOut(function(){
			$(".contact-done").fadeIn();
		});
		$.post("/_resource/mail/contact-mail.php", el.serialize(), function(data){
			if (data == "success")
			{
				$(".contact-done-head").html("Sent <i class='material-icons'>done</i>").addClass("contact-done-sent");
				$(".contact-done-body").html("Thanks for the message! Please check your E-Mail.");
			}
			else
			{
				$(".contact-done-head").html("Error <i class='material-icons'>clear</i>").addClass("contact-done-error");
				$(".contact-done-body").html("Somewhere, something went wrong.");
			}
		});
	}
	else
	{
		$(".contact-output").fadeIn(0);
	}

}


var LogoAnimating = 0;
var Logo = document.getElementById("logo");

$("#logo").on("mouseenter", function(){
	LogoAnimate();
});

function LogoAnimate()
{
	if (LogoAnimating == 0)
	{
		IconReset(Logo);
		LogoAnimating = 1;
		$("#logo").css({"animation-play-state": "running"});
		setTimeout(function()
		{
			LogoAnimating = 0;
		}, 1066);
	}
}

function IconReset(el)
{
	el.classList.remove("sprite");
	void el.offsetWidth;
	el.classList.add("sprite");
}

Typed.new('#home-type', {
	// strings: ["Hello^1000", "こんにちは^1000", "नमस्ते^1000", "We are <span class='type-bold'>Forever EV3</span>^1000", "And we Love <span class='type-bold'>Robotics</span>"],
	strings: ["We are <span class='type-bold'>Genius Co.</span>^1000", "And we make <span class='type-bold'>Music <br>Intelligence</span>"],
	typeSpeed: 75,
	backDelay: 75,
});


$(".post-container").accordion({
	header: ".post-head",
	heightStyle: "content",
	collapsible: true,
	active: false
});