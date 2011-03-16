$(document).ready(function(){
   $("btnAnswer1").click(function(event){
     alert("Thanks for visiting!");
   });
 });



function OnBtnAnswer1Click()
{
	$("#btnAnswer1").html("<span class='red'>falsch</span>")
	
	$("#btnAnswer1").animate({
		width: "40%",
		marginLeft: "0.6in",
		right: "350px",
		bottom: "340px",
		fontSize: "3em",
		},"slow");
		
	$("#btnAnswer2").animate({
	opacity:0
	},0);
	$("#btnAnswer3").animate({
	opacity:0
	},0);
	$("#btnAnswer4").animate({
	opacity:0
	},0);	
}

function OnBtnAnswer2Click()
{
	$("#btnAnswer2").html("<span class='red'>falsch</span>")
	
	$("#btnAnswer1").animate({
	opacity:0
	},0);
	
	$("#btnAnswer2").animate({
		width: "40%",
		marginLeft: "0.6in",
		right: "350px",
		bottom: "340px",
		fontSize: "3em",
		},"slow");
		
	
	$("#btnAnswer3").animate({
	opacity:0
	},0);
	$("#btnAnswer4").animate({
	opacity:0
	},0);	

}

function OnBtnAnswer3Click()
{
	$("#btnAnswer3").html("<span class='red'>falsch</span>")
	
	$("#btnAnswer1").animate({
	opacity:0
	},0);

	$("#btnAnswer2").animate({
	opacity:0
	},0);
	
	$("#btnAnswer3").animate({
		width: "40%",
		marginLeft: "0.6in",
		right: "350px",
		bottom: "340px",
		fontSize: "3em",
		},"slow");
		
	$("#btnAnswer4").animate({
	opacity:0
	},0);	

}


function OnBtnAnswer4Click()
{
	$("#btnAnswer4").html("<span class='green'>richtig</span>")
	
	$("#btnAnswer1").animate({
	opacity:0
	},0);

	$("#btnAnswer2").animate({
	opacity:0
	},0);
	
	$("#btnAnswer3").animate({
	opacity:0
	},0);
	
	$("#btnAnswer4").animate({
		width: "40%",
		marginLeft: "0.6in",
		right: "350px",
		bottom: "340px",
		fontSize: "3em",
		},"slow");
		
		

}

function OnBtnRetryClick()
{
	$("#btnAnswer1").html("Land")
	$("#btnAnswer2").html("Fluss")
	$("#btnAnswer3").html("Baum")
	$("#btnAnswer4").html("Stadt")
	
	$("#btnAnswer1").animate({
		opacity:1.0,
		width: "250px",
		height: "50px",
		right: "600px",
		bottom: "340px",
		fontSize: "1em",
		},500);

	$("#btnAnswer2").animate({
	opacity:1.0,
	width: "250px",
	height: "50px",
	right: "600px",
	bottom: "240px",
	fontSize: "1em",
	},500);
	
	$("#btnAnswer3").animate({
	opacity:1.0,
	width: "250px",
	height: "50px",
	right: "300px",
	bottom: "340px",
	fontSize: "1em",
	},500);
	
	$("#btnAnswer4").animate({
	opacity:1.0,
	width: "250px",
	height: "50px",
	right: "300px",
	bottom: "240px",
	fontSize: "1em",
	},500);	

	


}