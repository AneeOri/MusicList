import React, { useState } from "react";
import "./styles.css";
import { albumes } from "./recursos/albumes";

export default function App() {
  const [genero, actualizarGenero] = useState("todos");
  const [agrupacion, actualizarAgrupacion] = useState("todos");

  const onChangeGenero = (evento) => {
    actualizarGenero(evento.target.value);
  };

  const onChangeAgrupacion = (evento) => {
    console.log(evento.target.value);
    actualizarAgrupacion(evento.target.value);
  };
  /*
  Método acámica :)*/

  const crearLista = () => {
    let nuevaLista = albumes
      .filter((album) => {
        if (genero === "todos") {
          return true;
        }

        return album.genero === genero;
      })
      .filter((album) => {
        if (agrupacion === "todos") {
          return true;
        }
        return album.agrupacion === agrupacion;
      });
    return nuevaLista;
  };

  /*
  const crearLista = () => {
    let nuevaLista = albumes;
    if (genero !== "todos") {
      nuevaLista = nuevaLista.filter((album) => album.genero === genero);
    }

    if (agrupacion !== "todos") {
      nuevaLista = nuevaLista.filter(
        (album) => album.agrupacion === agrupacion
      );
    }
    return nuevaLista;
  };*/

  let listaFiltrada = crearLista();

  return (
    <div className="App">
      <div className="container">
        <div className="filtros">
          <div className="filtro-genero">
            <div>Género</div>
            <select className="select" value={genero} onChange={onChangeGenero}>
              <option value="todos">todos</option>
              <option value="pop">pop</option>
              <option value="soul">soul</option>
              <option value="rock">rock</option>
              <option value="dance">dance</option>
            </select>
          </div>

          <div className="filtro-genero">
            <div>Agrupación</div>
            <select
              className="select"
              value={agrupacion}
              onChange={onChangeAgrupacion}
            >
              <option value="todos">todos</option>
              <option value="solista">solista</option>
              <option value="banda">banda</option>
            </select>
          </div>
        </div>
        <div className="lista-album">
          {listaFiltrada.length > 0
            ? listaFiltrada.map((album) => (
                <Album
                  key={album.id}
                  artista={album.artista}
                  titulo={album.titulo}
                  fecha={album.lanzamiento}
                  portada={album.portada}
                  genero={album.genero}
                  agrupacion={album.agrupacion}
                />
              ))
            : "No hay resultados disponibles :("}
        </div>
      </div>
    </div>
  );
}

function Album(props) {
  const fechaActual = new Date();
  const fechaAlbum = new Date(props.fecha);
  const añoAlbum = fechaAlbum.getFullYear();
  const añoActual = fechaActual.getFullYear();
  const añosDiferencia = añoActual - añoAlbum;

  return (
    <div className="album-container">
      <img height="100%" src={props.portada} alt="tf" />
      <div className="album-contenido">
        <div className="album-descripcion">
          <div>
            <h3 className="album-titulo">{props.artista}</h3>

            <h4 className="artista-tipo">{props.agrupacion}</h4>

            <h4 className="album-subtitulo">{props.titulo}</h4>
            <h4 className="album-subtitulo">
              ({añoAlbum}) -{" "}
              {añosDiferencia > 1 ? (
                <span className="cronologia">Hace {añosDiferencia} años</span>
              ) : (
                <span className="cronologia">Hace menos de un año</span>
              )}
            </h4>
          </div>
        </div>
        <div className="album-pie">
          <span className="genero">{props.genero}</span>
        </div>
      </div>
    </div>
  );
}
