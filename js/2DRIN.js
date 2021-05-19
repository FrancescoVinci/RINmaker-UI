import {nodesRIN, linksRIN ,parseXmlBonds} from "./Parsing.js";

var params = JSON.parse(getCookie('params2D'));

var url;
var urlFromContent = "http://ring.dais.unive.it:8002/api/requestxml/fromcontent";
var urlFromName = "http://ring.dais.unive.it:8002/api/requestxml/fromname";

var divName = document.getElementById('pdbname');
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
}).ajaxStop(function() {
    $("#wait").hide();
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

        var logDiv = document.getElementById("log");
        var s = log.replace(/\[(.*?)\]/g, '');
        logDiv.innerHTML="<pre>"+s+"</pre>";

        const gData = {
            nodes: nodesRIN,
            links: linksRIN
        };
        
        const elem = document.getElementById('graph');
        
        const Graph = ForceGraph()(elem)
            .graphData(gData)
            .width(1125)
            .height(800)
            .nodeLabel(node => "ID : " + node.id + "<br>Res name : " + node.residue +"<br>Chain id : " + node.chain + "<br>Degree : " + node.degree)
            .linkLabel(edge => "BOND : " + edge.interaction + "<br>Atom 1 : " + edge.a1 +"<br>Atom 2 : " + edge.a2 + "<br>Distance : " + edge.distance  + "<br>Energy : " + edge.energy +" kj/mol"+"<br>source : " + edge.source.id + "<br>target : " + edge.target.id)
            .nodeColor('col_res')
            .nodeVal(node=>(node.degree))
            .linkColor('color_type')
            .linkWidth(1)
            .linkCurvature('curvature')
            .nodeRelSize(4)
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
            });
        
        Graph.d3AlphaDecay(0.02)
        Graph.d3VelocityDecay(0.3)
        Graph.enableZoomPanInteraction(true)
    
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
        div.innerHTML=`<svg width="285" height="80"><g class="lgnode" transform="translate(5, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ARG</text></g><g class="lgnode" transform="translate(65, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LYS</text></g><g class="lgnode" transform="translate(125, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">CYS</text></g><g class="lgnode" transform="translate(185, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ILE</text></g><g class="lgnode" transform="translate(245, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LEU</text></g><g class="lgnode" transform="translate(5, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">MET</text></g><g class="lgnode" transform="translate(65, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">PHE</text></g><g class="lgnode" transform="translate(125, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">PRO</text></g><g class="lgnode" transform="translate(185, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">TRP</text></g><g class="lgnode" transform="translate(245, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">TYR</text></g><g class="lgnode" transform="translate(5, 40)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">VAL</text></g><g class="lgnode" transform="translate(65, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ASN</text></g><g class="lgnode" transform="translate(125, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLN</text></g><g class="lgnode" transform="translate(185, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">HIS</text></g><g class="lgnode" transform="translate(245, 40)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ALA</text></g><g class="lgnode" transform="translate(5, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLY</text></g><g class="lgnode" transform="translate(65, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">SER</text></g><g class="lgnode" transform="translate(125, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">THR</text></g><g class="lgnode" transform="translate(185, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ASP</text></g><g class="lgnode" transform="translate(245, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLU</text></g><g class="lgnode" transform="translate(5, 70)"><circle r="4" x="10px" fill="grey" style="stroke-width: 1px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LIG</text></g></svg>`;
        var div2 = document.getElementById("svglink");
        div2.innerHTML=`<svg width="350" height="30">
            <g class="lgedge" transform="translate(0, 0)">
                <rect height="5" width="20" y="8px" fill="lightskyblue "></rect>
                <text font-size="10" y="15px" x="23px">HBOND</text>
            </g>
            <g class="lgedge" transform="translate(90, 0)">
                <rect height="5" width="20" y="8px" fill="gold"></rect>
                <text font-size="10" y="15px" x="23px">VDW</text>
            </g>
            <g class="lgedge" transform="translate(180, 0)">
                <rect height="5" width="20" y="8px" fill="red"></rect>
                <text font-size="10" y="15px" x="23px">PIPISTACK</text>
            </g>
            <g class="lgedge" transform="translate(270, 0)">
                <rect height="5" width="20" y="8px" fill="#9C31F9"></rect>
                <text font-size="10" y="15px" x="23px">SSBOND</text>
            </g>
            <g class="lgedge" transform="translate(0, 15)">
                <rect height="5" width="20" y="8px" fill="blue"></rect>
                <text font-size="10" y="15px" x="23px">IONIC</text>
            </g>
            <g class="lgedge" transform="translate(90, 15)">
                <rect height="5" width="20" y="8px" fill="gainsboro"></rect>
                <text font-size="10" y="15px" x="23px">IAC</text>
            </g>
            <g class="lgedge" transform="translate(180, 15)">
                <rect height="5" width="20" y="8px" fill="yellowgreen"></rect>
                <text font-size="10" y="15px" x="23px">PICATION</text>
            </g>
        </svg>`;


        var nodeColor = document.getElementById("nodeColor");
        nodeColor.onchange = function select() {
            var strUser = nodeColor.options[nodeColor.selectedIndex].text;
            if(strUser == 'Residue'){
                Graph.nodeColor("col_res")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80"><g class="lgnode" transform="translate(5, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ARG</text></g><g class="lgnode" transform="translate(65, 10)"><circle r="4" x="10px" fill="blue" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LYS</text></g><g class="lgnode" transform="translate(125, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">CYS</text></g><g class="lgnode" transform="translate(185, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ILE</text></g><g class="lgnode" transform="translate(245, 10)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LEU</text></g><g class="lgnode" transform="translate(5, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">MET</text></g><g class="lgnode" transform="translate(65, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">PHE</text></g><g class="lgnode" transform="translate(125, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">PRO</text></g><g class="lgnode" transform="translate(185, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">TRP</text></g><g class="lgnode" transform="translate(245, 25)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">TYR</text></g><g class="lgnode" transform="translate(5, 40)"><circle r="4" x="10px" fill="green" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">VAL</text></g><g class="lgnode" transform="translate(65, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ASN</text></g><g class="lgnode" transform="translate(125, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLN</text></g><g class="lgnode" transform="translate(185, 40)"><circle r="4" x="10px" fill="magenta" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">HIS</text></g><g class="lgnode" transform="translate(245, 40)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ALA</text></g><g class="lgnode" transform="translate(5, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLY</text></g><g class="lgnode" transform="translate(65, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">SER</text></g><g class="lgnode" transform="translate(125, 55)"><circle r="4" x="10px" fill="orange" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">THR</text></g><g class="lgnode" transform="translate(185, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">ASP</text></g><g class="lgnode" transform="translate(245, 55)"><circle r="4" x="10px" fill="red" style="stroke-width: 0px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">GLU</text></g><g class="lgnode" transform="translate(5, 70)"><circle r="4" x="10px" fill="grey" style="stroke-width: 1px; stroke: black;"></circle><text font-size="10" y="5px" x="10px">LIG</text></g></svg>`;
            }
            if(strUser == 'Chain'){
                Graph.nodeColor("col_ch")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#1F77B4" style="stroke-width: 0px; stroke: black;">  </circle>
                        <text font-size="10" y="5px" x="10px">A</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 10)">
                        <circle r="4" x="10px" fill="#FF7F0E" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">B</text>
                    </g>
                    <g class="lgnode" transform="translate(125, 10)">
                        <circle r="4" x="10px" fill="#2CA02C" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">C</text>
                    </g>
                    <g class="lgnode" transform="translate(185, 10)">
                        <circle r="4" x="10px" fill="#D62728" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">D</text>
                    </g>
                    <g class="lgnode" transform="translate(245, 10)">
                        <circle r="4" x="10px" fill="#B594CD" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">E</text>
                    </g>
                    <g class="lgnode" transform="translate(5, 25)">
                        <circle r="4" x="10px" fill="#8C564B" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">F</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 25)">
                        <circle r="4" x="10px" fill="#E377C2" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">G</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Degree'){
                Graph.nodeColor("col_deg")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#2EC448" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">0</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 10)">
                        <circle r="4" x="10px" fill="#9F8B00" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">15</text>
                    </g>
                    <g class="lgnode" transform="translate(125, 10)">
                        <circle r="4" x="10px" fill="#C32222" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">30</text>
                    </g>
                    <g class="lgnode" transform="translate(182, 10)">
                        <circle r="4" x="10px" fill="#1F77B4" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">Over 30</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Polarity'){
                Graph.nodeColor("col_pol")
                var div = document.getElementById("svg");
                div.innerHTML=`<svg width="285" height="80">
                    <g class="lgnode" transform="translate(5, 10)">
                        <circle r="4" x="10px" fill="#f2f2f2" style="stroke-width: 0px; stroke: black;">    </circle>
                        <text font-size="10" y="5px" x="10px">non polar</text>
                    </g>
                    <g class="lgnode" transform="translate(65, 10)">
                        <circle r="4" x="10px" fill="#b3b3b3" style="stroke-width: 0px; stroke: black;"></circle>
                        <text font-size="10" y="5px" x="10px">polar</text>
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
                        <text font-size="10" y="15px" x="23px">HBOND</text>
                    </g>
                    <g class="lgedge" transform="translate(90, 0)">
                        <rect height="5" width="20" y="8px" fill="gold"></rect>
                        <text font-size="10" y="15px" x="23px">VDW</text>
                    </g>
                    <g class="lgedge" transform="translate(180, 0)">
                        <rect height="5" width="20" y="8px" fill="red"></rect>
                        <text font-size="10" y="15px" x="23px">PIPISTACK</text>
                    </g>
                    <g class="lgedge" transform="translate(270, 0)">
                        <rect height="5" width="20" y="8px" fill="#9C31F9"></rect>
                        <text font-size="10" y="15px" x="23px">SSBOND</text>
                    </g>
                    <g class="lgedge" transform="translate(0, 15)">
                        <rect height="5" width="20" y="8px" fill="blue"></rect>
                        <text font-size="10" y="15px" x="23px">IONIC</text>
                    </g>
                    <g class="lgedge" transform="translate(90, 15)">
                        <rect height="5" width="20" y="8px" fill="gainsboro"></rect>
                        <text font-size="10" y="15px" x="23px">IAC</text>
                    </g>
                    <g class="lgedge" transform="translate(180, 15)">
                        <rect height="5" width="20" y="8px" fill="yellowgreen"></rect>
                        <text font-size="10" y="15px" x="23px">PICATION</text>
                    </g>
                </svg>`;
            }
            if(strUser == 'Distance'){
                Graph.linkColor("color_dist")
                var div = document.getElementById("svglink");
                div.innerHTML="<div></div>";
            }
        }

    },
    error: function(xhr, status, error){
        if(xhr.responseJSON.response === "error"){
            if(xhr.responseJSON.error.code === 404){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"File does not exist"+"</h1>";
            }else if(xhr.responseJSON.error.code == 400){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"Bad Request, please try again"+"</h1>";
            }else if(xhr.responseJSON.error.code == 500){
                var error = document.getElementById("error");
                error.innerHTML = "<h1 class=display-6 style='color:red'>"+"Internal Error, please try again later"+"</h1>";
            }  
        }    
    }
});





    