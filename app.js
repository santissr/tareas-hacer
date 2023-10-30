require("colors");

const { saveDB, readDB } = require("./helpers/saveFile");
const {
  inquirerMenu,
  pause,
  readInput,
  listTaskToDeleted,
  confirm,
  showChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tasks");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  tareasDB = readDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //Imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Descripción: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarPendientesCompletadas();
        break;

      case "4":
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        const ids = await showChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        const id = await listTaskToDeleted(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirm("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    saveDB(tareas.listadoArr);

    await pause();
  } while (opt !== "0");
};

main();
