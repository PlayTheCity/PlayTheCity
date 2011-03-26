resize = function() 
{
	$('#background').width($(window).width()); 
	$('#background').css('opacity', 0.8);
	
	if (Platform.isMobile())
		$('#background').height($(window).height());
	else
		$('#background').height($(window).height() - $('footer').height());
	
	$('#background').css('background-image', 'url(' + PTC.Asset('background', PTC.AssetType.Scale) + ')');


	switch (getDisplayOrientation())
	{
		case DisplayOrientation.Portrait:
		{
			
			scaleMenuFactor = ($(window).height() < $('#menu').height()) ? getScaleFactor($('#menu').height(), $(window).height()) : 1.0;
			
			$('#background').css('background-position-x', -((nextImgDim() - $(window).height()) / 2) + 'px');
			$('#background').css('background-position', '0px ' + -((nextImgDim() - $(window).height()) / 2) + 'px');
			
			break;
		}
		case DisplayOrientation.Landscape:
		{	
			
			scaleMenuFactor = ($(window).width() < $('#menu').width()) ? getScaleFactor($('#menu').width(), $(window).width()) : 1.0;
			
			$('#background').css('background-position-y', -((nextImgDim() - $(window).width()) / 2) + 'px');
			$('#background').css('background-position', -((nextImgDim() - $(window).width()) / 2) + 'px 0px');
			
			break;
		}
	}
};

$(document).ready(function() { resize(); });
$(window).resize(function() { resize(); });


PTC.Quiz = function(){

var zaehler=0

OnBtnAnswer1Click = function()
{
	if (zaehler==0){Answer1falsch();}	
	if (zaehler==1){Answer1falsch();}	
	if (zaehler==2){Answer1falsch();}	
	if (zaehler==3){Answer1falsch();}	
	if (zaehler==4){Answer1falsch();}	
	if (zaehler==5){Answer1falsch();}	
	if (zaehler==6){Answer1falsch();}
	if (zaehler==7){Answer1richtig(); PTC.Achievements.show('Superhirn'); }		
},

OnBtnAnswer2Click = function()
{
	if (zaehler==0){Answer2falsch();}	
	if (zaehler==1){Answer2richtig();}	
	if (zaehler==2){Answer2falsch();}	
	if (zaehler==3){Answer2falsch();}	
	if (zaehler==4){Answer2richtig();}	
	if (zaehler==5){Answer2falsch();}	
	if (zaehler==6){Answer2richtig();}
	if (zaehler==7){Answer2falsch();}

},

OnBtnAnswer3Click = function()
{
	if (zaehler==0){Answer3falsch();}	
	if (zaehler==1){Answer3falsch();}	
	if (zaehler==2){Answer3richtig();}	
	if (zaehler==3){Answer3richtig();}	
	if (zaehler==4){Answer3falsch();}	
	if (zaehler==5){Answer3falsch();}	
	if (zaehler==6){Answer3falsch();}
	if (zaehler==7){Answer3falsch();}	

},


OnBtnAnswer4Click = function()
{
	if(zaehler==0){Answer4richtig(); PTC.Achievements.show('Glückstreffer'); }	
	if(zaehler==1){Answer4falsch();}
	if(zaehler==2){Answer4falsch();}	
	if(zaehler==3){Answer4falsch();}
	if(zaehler==4){Answer4falsch();}			
	if(zaehler==5){Answer4richtig();}			
	if(zaehler==6){Answer4falsch();}
	if(zaehler==7){Answer4falsch();}		

},

OnBtnRetryClick = function()
{
	if (zaehler==0){Frage0();}	
	if (zaehler==1){Frage1();};	
	if (zaehler==2){Frage2();};	
	if (zaehler==3){Frage3();};	
	if (zaehler==4){Frage4();};	
	if (zaehler==5){Frage5();};
	if (zaehler==6){Frage6();};
	if (zaehler==7){Frage7();};
},



OnBtnNextClick = function()
{	
	if (zaehler<7){
		zaehler=zaehler+1;
				
		if (zaehler==1){
			$(".fragenAnzahl").html("2/8")
			Frage1();
		};	
		
		if (zaehler==2){
			$(".fragenAnzahl").html("3/8")
			Frage2();	
		};
		
		if (zaehler==3){
			$(".fragenAnzahl").html("4/8")
			Frage3();	
		};
		
		if (zaehler==4){
			$(".fragenAnzahl").html("5/8")
			Frage4();
		};
	
		if (zaehler==5){
			$(".fragenAnzahl").html("6/8")
			Frage5();	
		};	
	
		if (zaehler==6){
			$(".fragenAnzahl").html("7/8")
			Frage6();
		};
		
		if (zaehler==7){
			$(".fragenAnzahl").html("8/8")
			Frage7();
		};		
	}
}


Frage0 = function()
{
	$("#boxQuestion").html("Was ist dieses sogenannte Augsburg ?")
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



Frage1 = function()
{
	$("#boxQuestion").html("Welches Gebauede erbauten die Fugger ?")
	$("#btnAnswer1").html("Rathaus")
	$("#btnAnswer2").html("Fuggerei")
	$("#btnAnswer3").html("Kirche")
	$("#btnAnswer4").html("Dom")
	
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

Frage2 = function()
{
	$("#boxQuestion").html("Wie hoch ist der Perlachturm")
	$("#btnAnswer1").html("60m")
	$("#btnAnswer2").html("62m")
	$("#btnAnswer3").html("70m")
	$("#btnAnswer4").html("72m")
	
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

Frage3 = function()
{
	$("#boxQuestion").html("Wer hat das Augburger Rathaus erbaut?")
	$("#btnAnswer1").html("Burkhard Engelberg")
	$("#btnAnswer2").html("Franz Xavier Kleinhans")
	$("#btnAnswer3").html("Elias Holl")
	$("#btnAnswer4").html("Jakob Fugger")
	
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


Frage4 = function()
{
	$("#boxQuestion").html("Wann wurde die Anna-Kirche erbaut?")
	$("#btnAnswer1").html("1156")
	$("#btnAnswer2").html("1321")
	$("#btnAnswer3").html("1589")
	$("#btnAnswer4").html("1622")
	
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

Frage5 = function()
{
	$("#boxQuestion").html("Welcher beruehmte Saal befindet sich im Augsburger Rathaus ?")
	$("#btnAnswer1").html("Der blaue Saal")
	$("#btnAnswer2").html("Der gruene Saal")
	$("#btnAnswer3").html("Der rote Saal")
	$("#btnAnswer4").html("Der goldene Saal")
	
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


Frage6 = function()
{
	$("#boxQuestion").html("Wie heissen die drei Schutzpatrone der Stadt Augsburg ?")
	$("#btnAnswer1").html("Ulrich, Afra, Anna")
	$("#btnAnswer2").html("Ulrich, Afra, Simpertus")
	$("#btnAnswer3").html("Afra, Anna, Simpertus")
	$("#btnAnswer4").html("Ulrich, Afra, Elias")
	
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

Frage7 = function()
{
	$("#boxQuestion").html("Was ist die Fuggerei ?")
	$("#btnAnswer1").html("Sozialsiedlung")
	$("#btnAnswer2").html("Waisenhaus")
	$("#btnAnswer3").html("Kirche")
	$("#btnAnswer4").html("Hauptsitz der Fugger")
	
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



Answer1falsch =function()
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

Answer1richtig =function()
{
	$("#btnAnswer1").html("<span class='green'>richtig</span>")
	
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

Answer2falsch =function()
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

Answer2richtig =function()
{
	$("#btnAnswer2").html("<span class='green'>richtig</span>")
	
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

Answer3falsch =function()
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

Answer3richtig = function()
{
	$("#btnAnswer3").html("<span class='green'>richtig</span>")
		
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

Answer4falsch = function()
{
	$("#btnAnswer4").html("<span class='red'>falsch</span>")
		
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

Answer4richtig = function()
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


}();
