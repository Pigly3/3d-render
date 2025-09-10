import type { Component } from 'solid-js';
import { onMount } from 'solid-js'
const root3 =  1.73205080756887729352744634150587236694280525381038062805580697945193301690880003708114618675724857567562614141540670302996994509499895247881165551209437364852809323190230558206797482010108467492326501531234326690332288665067225466892183
type triangle = Array<Array<Array<number>>|string>
const App: Component = () => {
  let canvasRef:HTMLCanvasElement;
  let triangles:Array<triangle> = []
  triangles.push([[[0,0,100], [0,200,100], [200,100,20]], "#ff0000"]) //adding a triangle as an example
  const resizeCanvas = (ctx:CanvasRenderingContext2D|null) => {
    if (!ctx){return}
    const canvas = canvasRef;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderTriangles(ctx, triangles, canvas)
  };
  onMount(()=>{
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d")
    resizeCanvas(ctx);
    window.addEventListener("resize", ()=>{resizeCanvas(ctx)});
  })
  return (<canvas ref={el => (canvasRef = el)} width="500" height="500"></canvas>);
};
function renderTriangles(ctx:CanvasRenderingContext2D, triangles:Array<triangle>, canvas:HTMLCanvasElement){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  triangles.forEach((triangle)=>{
    drawTriangle(ctx, triangle[0], triangle[1], canvas)
  })
}
function drawTriangle(ctx:CanvasRenderingContext2D|null, points:Array<Array<number>>, color:string, canvas:HTMLCanvasElement) {
  if (!ctx){return}
  let adjPoints:Array<Array<number>> = []
  points.forEach((point)=>{
    console.log(point)
    adjPoints.push(adjustCoordinatess(canvas, point))
  })
  ctx.beginPath();
  ctx.moveTo(adjPoints[0][0], adjPoints[0][1]);
  ctx.lineTo(adjPoints[1][0], adjPoints[1][1]);
  ctx.lineTo(adjPoints[2][0], adjPoints[2][1]);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
function adjustCoordinatess(canvas:HTMLCanvasElement, coordinate:Array<number>){
  let point = coordinate.slice()
  return [(root3/2*(point[0] - point[1])) + canvas.width/2, canvas.height-((point[0] + point[1])/2 + point[2])] 
}
export default App;
