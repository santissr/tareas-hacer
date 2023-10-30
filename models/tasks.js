const Tarea = require("./task");
/**
 * _listado:
 *  { 'uuid-1232312323-123123-2: {id: 12 desc: asd, compleatadoEn: 29222}},
 *  { 'uuid-1232312323-123123-2: {id: 12 desc: asd, compleatadoEn: 29222}},
 *  { 'uuid-1232312323-123123-2: {id: 12 desc: asd, compleatadoEn: 29222}},
 *
 */

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listarPendientesCompletadas(completadas = true) {
    console.log("\n");
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completado".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(
            `${(contador + ".").green} ${desc} :: ${completadoEn.green}`
          );
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${(contador + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  listadoCompleto() {
    console.log("\n");
    // console.log(this._listado);
    const tareas = this._listado;
    let contador = 1;

    for (const tareaId in tareas) {
      const tarea = tareas[tareaId];
      const estado = tarea.completadoEn ? "Completada".green : "Pendiente".red;
      console.log(`${String(contador)}. ${tarea.desc} :: ${estado}`); //Necesito hacer esto: agregarle .green o .red dependiendo de si tarea.completadoEn es true;
      contador++;
    }
  }
  // completada en verde
  // pendiente en rojo
  // 1. descTarea :: Completada || Pendiente
  // 2. descTarea :: Completada || Pendiente
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
