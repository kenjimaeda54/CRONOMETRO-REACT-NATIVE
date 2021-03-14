import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cronometro: 0,
      texto: "Go",
      ultimo: "",
    };
    this.tempo = null;
    this.inicio = this.inicio.bind(this);
    this.limpa = this.limpa.bind(this);
  }

  inicio() {
    if (this.tempo === null) {
      this.tempo = setInterval(() => {
        this.setState({
          cronometro: this.state.cronometro + 0.1,
          texto: "Pause",
        });
      }, 100);
    } else {
      clearInterval(this.tempo);
      this.setState({ texto: "GO" });
      this.tempo = null;
    }
  }

  limpa() {
    if (this.tempo != null) {
      clearInterval(this.tempo);
      this.tempo = null;
    }
    this.setState({
      ultimo: this.state.cronometro,
      texto: "Go",
      cronometro: 0,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./src/cronometro.png")} style={styles.tempo} />
        <Text style={styles.tempo}>{this.state.cronometro.toFixed(1)}</Text>

        <View style={styles.botao}>
          <TouchableOpacity style={styles.botaoArea} onPress={this.inicio}>
            <Text style={styles.texto}>{this.state.texto}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoArea} onPress={this.limpa}>
            <Text style={styles.textoUltima}>Limpa</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.areaUltima}>
          <Text style={styles.ultima}>
            {this.state.ultimo > 0
              ? "Ultimo tempo: " + this.state.ultimo.toFixed(2) + "s"
              : ""}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00aeef",
    alignItems: "center",
    justifyContent: "center",
  },
  tempo: {
    marginTop: -160,
    color: "#FFF",
    fontSize: 65,
    fontWeight: "bold",
  },
  botao: {
    flexDirection: "row",
    marginTop: 70,
    height: 40,
  },
  botaoArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  textoArea: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  areaUltima: {
    marginTop: 40,
  },
  ultima: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#FFF",
  },
});
