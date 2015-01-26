var touchStartY,touchMoveY;

$(document).ready(function()
{
	var currentURL = window.location.href;
	if(currentURL.indexOf("?") == -1)
	{
		$("body").css("overflow","hidden");
		ec2014.initWindow();
		ec2014.pageShow(0);
		document.addEventListener("touchstart", touchStart, false);
	}
	else
	{
		self.location="http://file.caixin.com/datanews/ec2014/index.html";
	}
});

function touchStart(event)
{
	event.preventDefault(); 
	document.addEventListener("touchmove", touchMove, false);
	var touchMoveFlag = 1;  // 1 nextPage;  -1 prePage;
	var touch = event.touches[0];
	touchStartY = touch.pageY;
}

function touchMove(event)
{
	event.preventDefault(); 
	document.removeEventListener("touchmove", touchMove, false);

	var touch = event.touches[0];
	touchMoveY = touch.pageY;
	if(touchMoveY > touchStartY)
	{
		//ec2014.cardShow(-1);
	}
	else if(touchMoveY < touchStartY)
	{
		ec2014.cardShow(1);
	}
	else
	{
		return;
	}
}

window.onresize = function()
{
	ec2014.resizeWindow();
}

var ec2014 = {
	currentPageId:0,
	mainSvg:{},
	myChart:{},
	chartsCon:{},
	chartsGroup:[{},{},{},{},{},{},{},{},{},{}],
	srcWidth:0,
	srcHeight:0,
	initWindow:function(){
		var _this = this;
		
		_this.srcWidth = $(window).width();
		_this.srcHeight = $(window).height();
		$("#mainCon").css("width", $(window).width() + "px");
		$("#mainCon").css("height", $(window).height() + "px");
		$("#mainCon").css("position", "absolute");
		$("#mainCon").css("z-index", 9000);
		$("#mainCon").css("background-color", "#c49185");
		_this.mainSvg = d3.select("#mainCon").append("svg").attr("width","100%").attr("height","100%");
		
		$("#chartsCon").css("width", $(window).width() + "px");
		$("#chartsCon").css("height", $(window).height() + "px");
		$("#chartsCon").css("position", "absolute");
		$("#chartsCon").css("z-index", 9998);
		
	},
	resizeWindow:function(){
		var _this = this;
		
		$("#mainCon").css("width", $(window).width() + "px");
		$("#mainCon").css("height", $(window).height() + "px");
		_this.mainSvg.attr("width",$(window).width() + "px");
		_this.mainSvg.attr("height",$(window).height() + "px");
		_this.srcWidth = $(window).width();
		_this.srcHeight = $(window).height();
		
		_this.resizeSrcElements();
	},
	loadingAll:function()
	{
		var _this = this;
		//loading all image.if load complete,then show the card.
		

	},
	cardShow:function(directionId)
	{
		var _this = this;

		if(_this.currentPageId < 12 && directionId == 1)
		{
			_this.pageHide(_this.currentPageId++);
		}
		else if(_this.currentPageId > 0 && directionId == -1)
		{
			if(_this.currentPageId == 5)
			{
				_this.pageHide(_this.currentPageId);
				_this.currentPageId  = 1;
			}
			else
			{
				_this.pageHide(_this.currentPageId--);
			}
			
		}
		else
		{
			return;
		}
		
		_this.pageShow();
	},
	pageShow:function()
	{
		var _this = this;
		switch(_this.currentPageId)
		{
			case 0:
				_this.mainSvg.append("image").attr("id","a1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/1_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","a2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/1_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","a3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/1_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","aMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#a1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#a2").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#a3").transition().duration(500).delay(1250).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#aMoveUp").transition().duration(500).delay(2000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ document.addEventListener("touchstart", touchStart, false); });
				
				break;
			case 1:
				_this.mainSvg.append("image").attr("id","b1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/2_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","b2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/2_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","b3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/2_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","bMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#b1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#b2").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#b3").transition().duration(500).delay(1250).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(1);});
				
				break;
			case 2:
				_this.mainSvg.append("image").attr("id","c1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/3_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","cMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#c1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(2);});
				//_this.mainSvg.select("#cMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				break;
			case 3:
				_this.mainSvg.append("image").attr("id","d1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/4_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","dMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#d1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(3);});
				///_this.mainSvg.select("#dMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				
				break;
			case 4:
				_this.mainSvg.append("image").attr("id","e1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/5_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				//_this.mainSvg.append("image").attr("id","e2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/5_2_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				//_this.mainSvg.append("image").attr("id","e3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/5_2_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","eMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				
				_this.mainSvg.select("#e1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(41);});
				//_this.mainSvg.select("#e2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				//_this.mainSvg.select("#e3").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(41);});
				//_this.mainSvg.select("#eMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				
				break;
			case 5:
				_this.mainSvg.append("image").attr("id","f1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/6_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","f2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/6_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","f3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/6_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","fMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#f1").transition().duration(500).delay(500).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#f2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#f3").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(5);});
				//_this.mainSvg.select("#fMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				
				break;
			case 6:
				_this.mainSvg.append("image").attr("id","g1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/7_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","gMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#g1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(6);});
				//_this.mainSvg.select("#gMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				
				break;
			case 7:
				_this.mainSvg.append("image").attr("id","h1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/8_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				//_this.mainSvg.append("image").attr("id","h2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/8_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","h3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/8_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","hMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#h1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				//_this.mainSvg.select("#h2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#h3").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(7);});
				
				break;
			case 8:
				_this.mainSvg.append("image").attr("id","i1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/9_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","i2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/9_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","i3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/9_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","i4").attr("width","100%").attr("height","100%").attr("xlink:href","./images/9_4.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","i5").attr("width","100%").attr("height","100%").attr("xlink:href","./images/9_5.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","iMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#i1").transition().duration(500).delay(500).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#i2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#i3").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#i4").transition().duration(500).delay(1250).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#i5").transition().duration(500).delay(1500).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#iMoveUp").transition().duration(500).delay(2000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ document.addEventListener("touchstart", touchStart, false); });
				break;
			case 9:
				_this.mainSvg.append("image").attr("id","j1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/10_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","j2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/10_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","j3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/10_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","jMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#j1").transition().duration(500).delay(250).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#j2").transition().duration(500).delay(500).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#j3").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#j2").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(9);});
				
				break;
			case 10:
				_this.mainSvg.append("image").attr("id","k1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/11_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","k2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/11_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","k3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/11_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","k4").attr("width","100%").attr("height","100%").attr("xlink:href","./images/11_4.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","kMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#k1").transition().duration(500).delay(500).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#k2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#k3").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#k4").transition().duration(500).delay(1250).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ec2014.drawCharts(10);});
				_this.mainSvg.select("#kMoveUp").transition().duration(500).delay(1500).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ document.addEventListener("touchstart", touchStart, false); });
				
				break;
			case 11:
				_this.mainSvg.append("image").attr("id","l1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/12_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","lMoveUp").attr("width","100%").attr("height","100%").attr("xlink:href","./images/move_up_button.png").attr("opacity",0).attr("x",0).attr("y",0);
				
				_this.mainSvg.select("#l1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#lMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){ document.addEventListener("touchstart", touchStart, false); });
				break;
			case 12:
				$("#chartsCon").css("top",0).css("width",_this.srcWidth).css("height",_this.srcHeight);
				var conHtml = '<div id="endSrc" style="width:320px;height:500px;margin-left:' + ((_this.srcWidth - 320)/2) +'px;margin-top:' + ((_this.srcHeight - 500)/2) + 'px;opacity:0;">' + 
							'<image src="./images/13_n_1.png" width="320" height="140" />' +
							'<a href="http://economy.caixin.com/2015/jingjishujujiedu/" target="_self"><image src="./images/13_n_2.png" width="320" height="55" /></a>' +
							'<image src="./images/13_n_3.png" width="320" height="186" />' +
							'<a href="#" onclick="location.reload()" target="_self"><image src="./images/13_n_4.png" width="320" height="77" /></a>' +
							'</div>';
				$("#chartsCon").html(conHtml);
				
				d3.select("#endSrc").transition().duration(750).style("opacity",1);
				/*
				_this.mainSvg.append("image").attr("id","m1").attr("width","100%").attr("height","100%").attr("xlink:href","./images/13_1.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","m2").attr("width","100%").attr("height","100%").attr("xlink:href","./images/13_2.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","m3").attr("width","100%").attr("height","100%").attr("xlink:href","./images/13_3.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("image").attr("id","m4").attr("width","100%").attr("height","100%").attr("xlink:href","./images/13_4.png").attr("opacity",0).attr("x",0).attr("y",0);
				_this.mainSvg.append("rect").attr("id","pageLinker").attr("width",200).attr("height",60).attr("fill","#ffff00").attr("opacity",1).attr("x",(_this.srcWidth - 200)/2).attr("y",150);
				
				_this.mainSvg.select("#m1").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#m2").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#m3").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				_this.mainSvg.select("#m4").transition().duration(500).delay(750).attr("opacity",1).attr("x",0).attr("y",0);
				
				*/
				break;
			default:
				return;
		}
	},
	reStart:function()
	{
		console.log("restart.");
	},
	drawCharts:function(chartsId)
	{
		var _this = this;
		var i;
		
		switch(chartsId)
		{
			case 1:
				$("#chartsCon").css("height",220).css("top",210 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : false,
		                data:['总值','增长']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:20,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:4,
							max:80,
							min:0
		                },
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:3,
							max:15,
							min:6
		                }
		            ],
		            series : [
		                {
		                    name:'总值',
		                    type:'bar',
					smooth:true,
					barWidth:6,
					itemStyle:{
						normal:{
							color:"#ffffff"//,
							//label:{show:true,position:"top"}
						}
					},
					data:[18.49,21.63,26.58,31.40,34.09,40.15,47.31,51.95,58.80,{value:63.64,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}],
		                },
		                {
		                    name:'增长',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#915c54"
								}
							},
            				yAxisIndex:1,
		                    data:[11.3,12.7,14.2,9.6,9.2,10.4,9.3,7.7,7.7,{value:7.4,
					itemStyle:{
						normal:{
							color:"#915c54",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#bMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 2:
				$("#chartsCon").css("height",240).css("top",160 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
				_this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['工业增加值同比(%-规模以上工业企业)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:40,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:true,lineStyle:{color:"#dea79e"}},
							splitArea:{show:false},
							splitNumber:4,
							max:20,
							min:0
		                }
		            ],
		            series : [
		                {
		                    name:'工业增加值同比(%-规模以上工业企业)',
		                    type:'line',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[11.6,12.9,14.9,9.9,8.7,12.1,10.4,7.7,7.6,{value:8.3,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#cMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 3:

				$("#chartsCon").css("height",240).css("top",160 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['总值(左轴-亿吨)','增幅(右轴-%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:40,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:7,
							max:7,
							min:0
		                },
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:6,
							max:6,
							min:0
		                }
		            ],
		            series : [
		                {
		                    name:'总值(左轴-亿吨)',
		                    type:'bar',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[4.84,4.98,5.02,5.29,5.31,5.46,5.71,5.90,6.02,{value:6.07,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                },
		                {
		                    name:'增幅(右轴-%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#915c54"
								}
							},
            				yAxisIndex:1,
		                    data:[3.1,2.9,0.7,5.4,0.4,2.9,4.5,3.2,2.1,{value:0.9,
					itemStyle:{
						normal:{
							color:"#915c54",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#dMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 41:

				$("#chartsCon").css("height",290).css("top",140 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['出口额(左轴-亿美元)','贸易顺差(左轴-亿美元)','出口额同比(右轴-%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:50,
						y:90,
						x2:30,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{onZero:false,lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:8,
							max:24000,
							min:0
		                },
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:6,
							max:40,
							min:-20
		                }
		            ],
		            series : [
		                {
		                    name:'出口额(左轴-亿美元)',
		                    type:'bar',
							barCategoryGap:10,
							//barGap:10,
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[7620,9690,12205,14307,12016,15778,18984,20487,22090,{value:23427,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                },
		                {
		                    name:'贸易顺差(左轴-亿美元)',
		                    type:'bar',
							barCategoryGap:10,
							//barGap:10,
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#9d645a"
								}
							},
            				yAxisIndex:0,
		                    data:[1020,1775,2643,2981,1957,1815,1549,2303,2590,{value:3825,
					itemStyle:{
						normal:{
							color:"#9d645a",
							label:{show:true,position:"top"}
						}
					}}]
		                },
		                {
		                    name:'出口额同比(右轴-%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#915c54"
								}
							},
            				yAxisIndex:1,
		                    data:[28.4,27.2,25.8,17.4,-16,31.3,20.3,7.9,7.8,{value:6.1,
					itemStyle:{
						normal:{
							color:"#915c54",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#eMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 42:
				
				_this.mainSvg.select("#eMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;	
			case 5:

				$("#chartsCon").css("height",270).css("top",160 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['社会消费品零售总额(左轴-万亿元)','实际同比(右轴-%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:70,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{onZero:false,lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:6,
							max:30,
							min:0
		                },
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:5,
							max:20,
							min:10
		                }
		            ],
		            series : [
		                {
		                    name:'社会消费品零售总额(左轴-万亿元)',
		                    type:'bar',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[6.84,7.91,9.36,11.48,13.27,15.70,18.39,21.03,23.78,{value:26.24,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                },
		                {
		                    name:'实际同比(右轴-%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#915c54"
								}
							},
            				yAxisIndex:1,
		                    data:[12.0,12.6,12.5,21.6,17,14.8,11.6,12.1,11.5,{value:10.9,
					itemStyle:{
						normal:{
							color:"#915c54",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#fMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 6:

				$("#chartsCon").css("height",240).css("top",160 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['CPI(%)','PPI(%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:40,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{onZero:false,lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:true,lineStyle:{color:"#dea79e"}},
							splitArea:{show:false},
							splitNumber:7,
							max:8,
							min:-6
		                }
		            ],
		            series : [
		                {
		                    name:'PPI(%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[4.9,3.0,3.1,6.9,-5.4,5.5,6,-1.7,-1.9,{value:-1.9,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                },
		                {
		                    name:'CPI(%)',
		                    type:'line',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#58453f"
								}
							},
		                    data:[1.8,1.5,4.8,5.9,-0.7,3.3,5.4,2.6,2.6,{value:2.0,
					itemStyle:{
						normal:{
							color:"#58453f",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#gMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 7:

				$("#chartsCon").css("height",260).css("top",140 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['固定资产投资实际增速(%)','房地产投资实际增速(%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:60,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{onZero:false,lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:true,lineStyle:{color:"#dea79e"}},
							splitArea:{show:false},
							splitNumber:8,
							max:40,
							min:0
		                }
		            ],
		            series : [
		                {
		                    name:'房地产投资实际增速(%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[21.9,20.9,25,16.6,16.1,31.4,23.4,15.3,19.4,{value:9.9,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"bottom"}
						}
					}}]
		                },
		                {
		                    name:'固定资产投资实际增速(%)',
		                    type:'line',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#58453f"
								}
							},
		                    data:[25.9,24.2,21.7,16.5,35.3,20.6,20.2,19.6,19.2,{value:15.1,
					itemStyle:{
						normal:{
							color:"#58453f",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#hMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 9:

				$("#chartsCon").css("height",240).css("top",180 + (_this.srcHeight - 500)/2 ).css("background-color","#fffff0");
		
				_this.myChart = echarts.init(document.getElementById('chartsCon'));
		        _this.myChart.setOption({
		            tooltip : {
						show:false,
		                trigger: 'axis'
		            },
		            legend: {
		                show : true,
						selectedMode:false,
						textStyle:{color:'#ead7d3',fontSize:16},
		                data:['城镇实际增幅(%)','农村实际增幅(%)']
		            },
		            toolbox: {
		                show : false
		            },
					grid:{
						x:40,
						y:40,
						x2:40,
						y2:40,
						backgroundColor:'rgba(0,0,0,0)',
						borderWidth:0
					},
		            xAxis : [
		                {
		                    type : 'category',
							axisLine:{onZero:false,lineStyle:{color:"#ffffff",width:1}},
							axisTick:{show:false},
							axisLabel:{
								interval:0,
								textStyle:{color:"#ffffff"},
								formatter:function(v){
									if(parseInt(v) % 2 == 0) return v;
									return "";
								}
							},
							splitLine:{show:false},
							splitArea:{show:false},
							splitNumber:12,
		                    data : ['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014']
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
							axisLine:{lineStyle:{color:"#ffffff",width:1}},
							axisLabel:{
								textStyle:{color:"#ffffff"}
							},
							splitLine:{show:true,lineStyle:{color:"#dea79e"}},
							splitArea:{show:false},
							splitNumber:7,
							max:14,
							min:0
		                }
		            ],
		            series : [
		                {
		                    name:'城镇实际增幅(%)',
		                    type:'line',
							smooth:true,
							barWidth:6,
							itemStyle:{
								normal:{
									color:"#58453f"
								}
							},
		                    data:[9.6,10.4,12.2,8.4,9.8,7.8,8.4,9.6,7.0,{value:6.8,
					itemStyle:{
						normal:{
							color:"#58453f",
							label:{show:true,position:"bottom"}
						}
					}}]
		                },
		                {
		                    name:'农村实际增幅(%)',
		                    type:'line',
							smooth:true,
							itemStyle:{
								normal:{
									color:"#ffffff"
								}
							},
		                    data:[8.5,8.6,9.5,8.0,8.6,10.9,11.4,10.7,9.3,{value:9.2,
					itemStyle:{
						normal:{
							color:"#ffffff",
							label:{show:true,position:"top"}
						}
					}}]
		                }
		            ]
		        });
				
				_this.mainSvg.select("#jMoveUp").transition().duration(500).delay(1000).attr("opacity",1).attr("x",0).attr("y",0).each("end",function(){document.addEventListener("touchstart", touchStart, false);});
				
				break;
			case 10:
				
				break;
			
		}
	},
	rePlay:function()
	{
		var _this = this;
		
		_this.currentPageId = 0;
		_this.pageHide(10);
		_this.pageShow();
		document.addEventListener("touchstart", touchStart, false);
	},
	pageHide:function(pageId)
	{
		var _this = this;
		
		switch(pageId)
		{
			case 0:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#a3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#a2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#a1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#aMoveUp").transition().duration(500).attr("opacity",0).remove();
				break;
			case 1:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#b3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#b2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#b1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#bMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 2:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#c1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#cMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 3:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#d1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#dMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 4:
				document.removeEventListener("touchstart", touchStart, false);
				//_this.mainSvg.select("#e3").transition().duration(500).attr("opacity",0).remove();
				//_this.mainSvg.select("#e2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#e1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#eMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 5:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#f1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#f2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#f3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#fMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 6:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#g1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#gMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 7:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#h1").transition().duration(500).attr("opacity",0).remove();
				//_this.mainSvg.select("#h2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#h3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#hMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 8:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#i1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#i2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#i3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#i4").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#i5").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#iMoveUp").transition().duration(500).attr("opacity",0).remove();
				break;
			case 9:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#j1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#j2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#j3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#jMoveUp").transition().duration(500).attr("opacity",0).remove();
				_this.myChart.clear();
				_this.myChart.dispose();
				break;
			case 10:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#k1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#k2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#k3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#k4").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#kMoveUp").transition().duration(500).attr("opacity",0).remove();
				//_this.myChart.clear();
				//_this.myChart.dispose();
				break;
			case 11:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#l1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#lMoveUp").transition().duration(500).attr("opacity",0).remove();
				break;
			case 12:
				document.removeEventListener("touchstart", touchStart, false);
				_this.mainSvg.select("#m1").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#m2").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#m3").transition().duration(500).attr("opacity",0).remove();
				_this.mainSvg.select("#m4").transition().duration(500).attr("opacity",0).remove();
				break;
			default:
				return;
		}
	},
	resizeSrcElements:function()
	{
		var _this = this;
		
		switch(_this.currentPageId)
		{
			case 0:
				//_this.mainSvg.select("#a4").transition().duration(500).attr("opacity",1).attr("x",-(_this.srcWidth/2)).attr("y",-(_this.srcHeight/2));
				break;
			default:
				return;
		}
	}
};