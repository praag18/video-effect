import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Pressable } from 'react-native'
import spider from './examples/Video/spider.webp'
import { Bus } from "gl-react";
import { Surface } from "gl-react-dom";
import { BlurV } from "./examples/blurmap";
import { Saturate } from "./examples/saturation";
import StaticBlurMap from "./examples/toolbox/StaticBlurMap";
import Ranges from './examples/Ranges/Rangex'

// ----- Map Texture Imgs -----
import mapTexture1 from './examples/blurmap/blurmap1.png'
import mapTexture2 from './examples/blurmap/blurmap2.png'
import mapTexture3 from './examples/blurmap/blurmap3.png'
import mapTexture4 from './examples/blurmap/blurmap4.png'
import mapTexture5 from './examples/blurmap/blurmap5.png'

export default class App extends Component {
  state = {
    contrast: 1,
    saturation: 1,
    brightness: 1,
    factor: 0,
    passes: 1,
    map: StaticBlurMap.images[0],
    border: "none"
  };

  render() {
    const { factor, passes, contrast, saturation, brightness, map, } = this.state;
    const textures = [mapTexture1, mapTexture2, mapTexture3, mapTexture4, mapTexture5]

    // ----- toggle Red Outline Of Blur Texture Map ----
    const toggleRedBorder = (e, index) => {
      document.querySelectorAll(".r-flexBasis-1mlwlqe").forEach(imgs =>
        imgs.style.border = "none"
      )
      e.target.parentNode.style.border = "2px solid red"
      this.setState({ map: StaticBlurMap.images[index], })
    }

    // ----- styles -----
    const styles = StyleSheet.create({
      flexjustify: {
        justifyContent: "center",
        alignItems: "center",
      },

      container: {
        backgroundColor: "rgb(45,45,45)",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        flex: 1,
        flexDirection: "column",
      },

      topCont: {
        width: "500px",
        height: "350px",
        padding: "5px",
        flex: 1,
        overflow: "hidden",
      },

      bottomCont: {
        width: "500px",
        height: "350px",
        padding: "5px",
        flex: 0.8,
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "white",
      },

      lowerCont: {
        width: "500px",
        backgroundColor: "white",
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
        gap: "30px",
      },

      BlurImgCont: {
        backgroundColor: "white",
        flex: 0.5,
        flexDirection: "row",
        gap: "10px",
      },

      blurImages: {
        height: "80px",
        width: "80px",
      }
    })

    return (
      <>
        <View style={[styles.container, styles.flexjustify]}>
          <View style={[styles.topCont, styles.flexjustify]}>
            <Surface style={styles.picture} width={900} height={330} pixelRatio={1}>
              <Bus ref="vid">
                <Saturate contrast={contrast} saturation={saturation} brightness={brightness}>
                  {spider}
                </Saturate>
              </Bus>
              <BlurV map={map} passes={passes} factor={factor}>
                {
                  () => this.refs.vid
                }
              </BlurV>
            </Surface>
          </View>

          <View style={[styles.bottomCont, styles.flexjustify]}>
            <Ranges min={0} max={4} steps={0.1} value={contrast} onChange={contrast => this.setState({ contrast })} label="Contrast" />
            <Ranges min={0} max={4} steps={0.1} value={saturation} onChange={saturation => this.setState({ saturation })} label="Saturation" />
            <Ranges min={0} max={4} steps={0.1} value={brightness} onChange={brightness => this.setState({ brightness })} label="Brightness" />
            <Ranges min={0} max={8} steps={0.2} value={factor} onChange={factor => this.setState({ factor })} label="Blur" />
            <Ranges min={1} max={8} value={passes} onChange={passes => this.setState({ passes })} label="Blur Passes" />
          </View>

          <View style={styles.lowerCont}>
            <Text style={{ paddingLeft: "30px", fontFamily: "monospace" }}>Blur Texture Map</Text>
            <View style={[styles.BlurImgCont, styles.flexjustify]}>
              {
                textures.map((allImgs, index) =>
                  <Pressable key={index} onPress={(e) => toggleRedBorder(e, index)} style={{ border: this.state.border }}>
                    <Image source={{ uri: allImgs }} style={styles.blurImages} />
                  </Pressable>
                )
              }
            </View>
          </View>
        </View>
      </>
    );
  }
}
