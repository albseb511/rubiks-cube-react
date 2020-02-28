import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Three from "three"

// a lot of help from https://codesandbox.io/s/81qjyxonm8

export default class Rubiks extends Component {
    static propTypes = {
        prop: PropTypes
    }
    componentDidMount(){
        var scene = new Three.Scene()
        var camera = new Three.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000)
        var renderer = new Three.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        this.elem.appendChild(renderer.domElement)
        var geometry = new Three.BoxGeometry(1,1,1)
        var material = new Three.MeshBasicMaterial( {color: 0x00ff00})
        var cube = new Three.Mesh(geometry,material)
        scene.add(cube)
        camera.position.z = 5;

        var animate = function() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        };

        animate();
    }
    render() {
        return (
            <div ref={ele=>{this.elem = ele}}>
                Rubiks cube
            </div>
        )
    }
}
