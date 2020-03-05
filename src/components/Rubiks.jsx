import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Three from "three"
import faceSide from "../helper/faceSide"
import RandExp from 'randexp'


export default class Rubiks extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props){
        super(props)
        let positions = []
        for(let x = 0; x<=2; x++){
            for(let y = 0; y<=2; y++){
                for(let z = 0; z<=2; z++){
                    positions.push([x,y,z])
                }
            }
        }
        this.state = {
            rubiksCube: ['W','Y','R','G','B','O'].map(a=> new Array(9).fill(a)),
            positions,
            colors: {
                R: '0xFF0000',
                G: '0x008000',
                Y: '0xFFFF00',
                O: '0xFFA500',
                B: '0x0000FF',
                W: 0xffffff,
                inner: 0xffffff
            }

        }
    }
    componentDidMount(){
        console.log(this.state)
        var pos = this.state.rubiksCube.flat()
        console.log(pos)
        var scene = new Three.Scene()
        var camera = new Three.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000)
        var renderer = new Three.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        this.elem.appendChild(renderer.domElement)
        var cubes = new Three.Group()
        
        for(let i=0; i<27; i++){
            let geometry = new Three.BoxGeometry(1,1,1)
            let side = faceSide[i]
            
            for(let k=0, c=0; k<geometry.faces.length-1; c++){
                let hex;
                if(!!side[c]){
                    console.log(side[c])
                    console.log(pos[i])
                    // hex = this.state.colors[pos[i]]
                    hex = '0x00ffff'
                    // hex =  new RandExp(/^0x[0-8a-f]{6}$/).gen()
                    console.log(hex)
                }
                else{
                    hex = '0x000000'
                }
                geometry.faces[k].color.setHex(Number(hex))
                geometry.faces[k+1].color.setHex(Number(hex))
                k = k+1
            }
            geometry.colorsNeedUpdate = true
            // let material = new Three.MeshBasicMaterial( {color: 0x00ff00 })
            let material = new Three.MeshBasicMaterial( {color: Number(new RandExp(/^0x[0-8a-f]{6}$/).gen()),
                                                         side: Three.DoubleSide
                                                        // vertexColors: Three.FaceColors,
                                                                 })
            let cube = new Three.Mesh(geometry,material)
            cube.position.set( ...this.state.positions[i] );
            
            var edge = new Three.WireframeGeometry( cube, 0x000000 );
            cubes.add(edge);
            cubes.add(cube)
        }
        
        scene.add(cubes)
        camera.position.x = 10;
        camera.position.y = 10;
        camera.position.z = 10;
        camera.lookAt(scene.position)
        renderer.render(scene, camera);

        // animate();
    }
    render() {
        return (
            <div ref={ele=>{this.elem = ele}}>
                <div>
                    Rubiks cube    
                </div>
            </div>
        )
    }
}
