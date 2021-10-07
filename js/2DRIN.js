import {nodesRIN, linksRIN ,parseXmlBonds} from "./Parsing.js";
import {myChart, myChart2, myChart3, myChart4} from "./chart.js"

var params = JSON.parse(getCookie('params2D'));
const regexpPDB = /^[\w\-_\s]+.pdb$/;

var url;
var pdbname = params.pdbname;
var urlFromContent = "https://ring.dais.unive.it:8002/api/requestxml/fromcontent";
var urlFromName = "https://ring.dais.unive.it:8002/api/requestxml/fromname";

var divName = document.getElementById('pdbname');
if(!params.pdbname.match(regexpPDB)){
    params.pdbname = params.pdbname + '.pdb';
    pdbname = params.pdbname;
}
divName.innerHTML = params.pdbname;

if(params.hasOwnProperty('fromname')){
    url = urlFromName;
    delete params.fromname;
}else if(params.hasOwnProperty('fromcontent')){
    url = urlFromContent;
    params.content = localStorage.getItem('content');
    delete params.fromcontent;
}

$(document).ajaxStart(function() {
    $("#wait").show();
    $("#wait2").show();
    $("#avviso").show();
    $("#bar-chart").hide();
    $("#doughnut-chart").hide();
    $("#h1-chart").hide();
    $("#h2-chart").hide();
}).ajaxStop(function() {
    $("#wait").hide();
    $("#wait2").hide();
    $("#avviso").hide();
    $("#bar-chart").show();
    $("#doughnut-chart").show();
    $("#h1-chart").show();
    $("#h2-chart").show();
    myChart.update();
    myChart2.update();
    myChart3.update();
    myChart4.update();
});


$.ajax({
    type: "POST",
    url: url,
    data: params,
    async: 'false',
    success: function(res) {
        var log = res.data.log;
        var xml =  res.data.xml;
        parseXmlBonds(xml);

        const gData = {
            nodes: nodesRIN,
            links: linksRIN
        };
        
        const elem = document.getElementById('graph');
        
        const Graph = ForceGraph()(elem)
            .graphData(gData)
            /*.width(1000)*/
            .nodeLabel(node => "ID : " + node.id + "<br>Res name : " + node.residue +"<br>Chain id : " + node.chain + "<br>Degree : " + node.degree)
            .linkLabel(edge => "BOND : " + edge.interaction + "<br>Atom 1 : " + edge.a1 +"<br>Atom 2 : " + edge.a2 + "<br>Distance : " + edge.distance  + "<br>Energy : " + edge.energy +" kj/mol"+"<br>source : " + edge.source.id + "<br>target : " + edge.target.id)
            .nodeColor('col_res')
            .nodeVal(node=>(node.degree))
            .linkColor('color_type')
            .linkWidth(1)
            .linkCurvature('curvature')
            .nodeRelSize(2)
            .backgroundColor('#FFFFFF')
            .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
            .onLinkHover(edge => elem.style.cursor = edge ? 'pointer' : null)
            .onNodeClick((node,ctx) => {
               Graph.zoom(1, 1);
            })
            .onNodeDragEnd(node => {
                node.fx = node.x;
                node.fy = node.y;
            })
            .onNodeRightClick(node => {
                node.fx = null;
                node.fy = null;
            })
            .warmupTicks(100)
            .autoPauseRedraw(false)
            .cooldownTime(3000);
        
        Graph.d3AlphaDecay(0.02)
        Graph.d3VelocityDecay(0.7)
        Graph.enableZoomPanInteraction(true)

        /*Object.prototype.getByIndex = function(index) {
            return this[Object.keys(this)[index]];
          };

        console.log("nodes: " + Object.keys(nodesRIN).length);
        var count=0;
        for(var i=0 ; i<Object.keys(nodesRIN).length ; i++){
            count += nodesRIN.getByIndex(i).degree;
        }
        console.log("degree avg: " + count/Object.keys(nodesRIN).length);
        console.log("links: " + Object.keys(linksRIN).length);*/

        /*if()*/
        /*.cooldownTicks(0)*/

        
        const gravity = Graph.d3Force('charge'); 

        var rangesliderGravity = document.getElementById("sliderGravity");
        var output1 = document.getElementById("valueG");
        output1.innerHTML = rangesliderGravity.value;
        rangesliderGravity.oninput = function() {
            output1.innerHTML = this.value;
            gravity.strength(this.value);
            Graph.d3ReheatSimulation();
        }

        const linkForce = Graph.d3Force('link');

        var rangesliderDistance = document.getElementById("sliderDistance");
        var output = document.getElementById("valueD");
        output.innerHTML = rangesliderDistance.value;
        rangesliderDistance.oninput = function() {
            output.innerHTML = this.value;
            linkForce.distance(this.value);
            Graph.d3ReheatSimulation();
        }

        var div = document.getElementById("svg");
        div.innerHTML=`<svg width="285" height="80"><g class="lgnode" transform="translate(5, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ARG</text></g><g class="lgnode" transform="translate(65, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LYS</text></g><g class="lgnode" transform="translate(125, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">CYS</text></g><g class="lgnode" transform="translate(185, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ILE</text></g><g class="lgnode" transform="translate(245, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LEU</text></g><g class="lgnode" transform="translate(5, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">MET</text></g><g class="lgnode" transform="translate(65, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">PHE</text></g><g class="lgnode" transform="translate(125, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">PRO</text></g><g class="lgnode" transform="translate(185, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">TRP</text></g><g class="lgnode" transform="translate(245, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">TYR</text></g><g class="lgnode" transform="translate(5, 40)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">VAL</text></g><g class="lgnode" transform="translate(65, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ASN</text></g><g class="lgnode" transform="translate(125, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLN</text></g><g class="lgnode" transform="translate(185, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">HIS</text></g><g class="lgnode" transform="translate(245, 40)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ALA</text></g><g class="lgnode" transform="translate(5, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLY</text></g><g class="lgnode" transform="translate(65, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">SER</text></g><g class="lgnode" transform="translate(125, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">THR</text></g><g class="lgnode" transform="translate(185, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ASP</text></g><g class="lgnode" transform="translate(245, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLU</text></g><g class="lgnode" transform="translate(5, 70)"><circle r="4" x="10px" fill="grey" style="stroke-width: 1px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LIG</text></g></svg>`;
        var div2 = document.getElementById("svglink");
        div2.innerHTML=`<svg width="350" height="30">
            <g class="lgedge" transform="translate(0, 0)">
                <rect height="5" width="20" y="8px" fill="lightskyblue "></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">HBOND</text>
            </g>
            <g class="lgedge" transform="translate(80, 0)">
                <rect height="5" width="20" y="8px" fill="gold"></rect>
                <text font-size="10" y="15px" x="23px"fill="#FFFFFF">VDW</text>
            </g>
            <g class="lgedge" transform="translate(160, 0)">
                <rect height="5" width="20" y="8px" fill="red"></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">PIPISTACK</text>
            </g>
            <g class="lgedge" transform="translate(240, 0)">
                <rect height="5" width="20" y="8px" fill="#9C31F9"></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">SSBOND</text>
            </g>
            <g class="lgedge" transform="translate(0, 15)">
                <rect height="5" width="20" y="8px" fill="blue"></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">IONIC</text>
            </g>
            <g class="lgedge" transform="translate(80, 15)">
                <rect height="5" width="20" y="8px" fill="gainsboro"></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">IAC</text>
            </g>
            <g class="lgedge" transform="translate(160, 15)">
                <rect height="5" width="20" y="8px" fill="yellowgreen"></rect>
                <text font-size="10" y="15px" x="23px" fill="#FFFFFF">PICATION</text>
            </g>
        </svg>`;


        var nodeColor = document.getElementById("nodeColor");
        nodeColor.onchange = function select() {
            var strUser = nodeColor.options[nodeColor.selectedIndex].text;
            if(strUser == 'Residue'){
                Graph.nodeColor("col_res")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80"><g class="lgnode" transform="translate(5, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ARG</text></g><g class="lgnode" transform="translate(65, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LYS</text></g><g class="lgnode" transform="translate(125, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">CYS</text></g><g class="lgnode" transform="translate(185, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ILE</text></g><g class="lgnode" transform="translate(245, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LEU</text></g><g class="lgnode" transform="translate(5, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">MET</text></g><g class="lgnode" transform="translate(65, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">PHE</text></g><g class="lgnode" transform="translate(125, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">PRO</text></g><g class="lgnode" transform="translate(185, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">TRP</text></g><g class="lgnode" transform="translate(245, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">TYR</text></g><g class="lgnode" transform="translate(5, 40)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">VAL</text></g><g class="lgnode" transform="translate(65, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ASN</text></g><g class="lgnode" transform="translate(125, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLN</text></g><g class="lgnode" transform="translate(185, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">HIS</text></g><g class="lgnode" transform="translate(245, 40)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px"fill="#FFFFFF">ALA</text></g><g class="lgnode" transform="translate(5, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLY</text></g><g class="lgnode" transform="translate(65, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">SER</text></g><g class="lgnode" transform="translate(125, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">THR</text></g><g class="lgnode" transform="translate(185, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">ASP</text></g><g class="lgnode" transform="translate(245, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">GLU</text></g><g class="lgnode" transform="translate(5, 70)"><circle r="4" x="10px" fill="grey" style="stroke-width: 1px; stroke: black;"></circle><text font-size="10" y="5px" x="10px" fill="#FFFFFF">LIG</text></g></svg>`;
            }
            if(strUser == 'Chain'){
                Graph.nodeColor("col_ch")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#1F77B4" style="stroke-width: 0px; stroke: black;">  </circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">A</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 10)">
                        <circle r="4" x="10px" fill="#FF7F0E" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">B</text>
                    </g>
                    <g class="lgnode" transform="translate(125, 10)">
                        <circle r="4" x="10px" fill="#2CA02C" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">C</text>
                    </g>
                    <g class="lgnode" transform="translate(185, 10)">
                        <circle r="4" x="10px" fill="#D62728" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">D</text>
                    </g>
                    <g class="lgnode" transform="translate(245, 10)">
                        <circle r="4" x="10px" fill="#B594CD" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">E</text>
                    </g>
                    <g class="lgnode" transform="translate(5, 25)">
                        <circle r="4" x="10px" fill="#8C564B" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">F</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 25)">
                        <circle r="4" x="10px" fill="#E377C2" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">G</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Degree'){
                Graph.nodeColor("col_deg")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#2EC448" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">1</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 10)">
                        <circle r="4" x="10px" fill="#9F8B00" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">15</text>
                    </g>
                    <g class="lgnode" transform="translate(125, 10)">
                        <circle r="4" x="10px" fill="#C32222" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">30</text>
                    </g>
                    <g class="lgnode" transform="translate(182, 10)">
                        <circle r="4" x="10px" fill="#1F77B4" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">Over 30</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Polarity'){
                Graph.nodeColor("col_pol")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#808080" style="stroke-width: 0px; stroke: black;">    </circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">non polar</text>
                    </g>
                    <g class="lgnode" transform="translate(75, 10)">
                        <circle r="4" x="10px" fill="#00BFFF" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px" fill="#FFFFFF">polar</text>
                    </g>
                </svg>`;
            }
        }

        var linkColor = document.getElementById("linkColor");
        linkColor.onchange = function select() {
            var strUser = linkColor.options[linkColor.selectedIndex].text;
            if(strUser == 'Uniform'){
                Graph.linkColor("color_uni")
                var div = document.getElementById("svglink");
                div.innerHTML="<div></div>";
            }
            if(strUser == 'Type'){
                Graph.linkColor("color_type")
                var div = document.getElementById("svglink");
                div.innerHTML=`<svg width="350" height="30">
                    <g class="lgedge" transform="translate(0, 0)">
                        <rect height="5" width="20" y="8px" fill="lightskyblue "></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">HBOND</text>
                    </g>
                    <g class="lgedge" transform="translate(75, 0)">
                        <rect height="5" width="20" y="8px" fill="gold"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">VDW</text>
                    </g>
                    <g class="lgedge" transform="translate(150, 0)">
                        <rect height="5" width="20" y="8px" fill="red"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">PIPISTACK</text>
                    </g>
                    <g class="lgedge" transform="translate(225, 0)">
                        <rect height="5" width="20" y="8px" fill="#9C31F9"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">SSBOND</text>
                    </g>
                    <g class="lgedge" transform="translate(0, 15)">
                        <rect height="5" width="20" y="8px" fill="blue"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">IONIC</text>
                    </g>
                    <g class="lgedge" transform="translate(75, 15)">
                        <rect height="5" width="20" y="8px" fill="gainsboro"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">IAC</text>
                    </g>
                    <g class="lgedge" transform="translate(150, 15)">
                        <rect height="5" width="20" y="8px" fill="yellowgreen"></rect>
                        <text font-size="10" y="15px" x="23px" fill="#FFFFFF">PICATION</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Distance'){
                Graph.linkColor("color_dist")
                var div = document.getElementById("svglink");
                div.innerHTML="<div></div>";
            }
        }

        elementResizeDetectorMaker().listenTo(
            document.getElementById('content'),
            el => Graph.width(el.offsetWidth - 100)
        );

        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
        
            element.style.display = 'none';
            document.body.appendChild(element);
        
            element.click();
        
            document.body.removeChild(element);
        }
        
        document.getElementById("downloadXml").addEventListener("click", function(){
            download(pdbname.slice(0, -4) + ".xml", xml);
        }, false);

    },
    error: function(xhr, status, error){
        if(xhr.responseJSON.response === "error"){
            if(xhr.responseJSON.error.code === 404){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"File does not exist"+"</h1>";
            }else if(xhr.responseJSON.error.code == 400){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"Bad Request, please try again: "+xhr.responseJSON.error.message+"</h1>";
            }else if(xhr.responseJSON.error.code == 500){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"Internal Error, please try again later"+"</h1>";
            }  
            document.getElementById("bar-chart").outerHTML = "";
            document.getElementById("doughnut-chart").outerHTML = "";
            document.getElementById("h1-chart").outerHTML = "";
            document.getElementById("h2-chart").outerHTML = "";
        }    
    }
});





    
