class Dragger {
    
    constructor() {
        this.dragStart = this.dragStart.bind(this)
        this.dragOver = this.dragOver.bind(this)
        this.drop = this.drop.bind(this)
        this.clearDragStyles = this.clearDragStyles.bind(this);
        this.moveColumn = this.moveColumn.bind(this);

        this.tableElement = document.querySelector("table");
        this.selectedColumn = null; // Columna que estamos arrastrando
        this.hoveredColumn = null; // Columna con la que vamos a intercambiar posición
        this.AddDraggingEvents();

    }

    AddDraggingEvents() {

        this.tableElement.querySelectorAll("thead th").forEach(th => {
            th.addEventListener("pointerdown", (e) => {
                console.log(e.currentTarget);
                this.selectedColumn = e.currentTarget;
                console.log(this.selectedColumn);
            });
            th.addEventListener("dragstart", this.dragStart);
            th.addEventListener("dragover", this.dragOver);
            th.addEventListener("drop", this.drop);
        })

    }

    dragStart() {        

    }

    dragOver(e) {
                
        this.clearDragStyles(); // Limpiar estilos de columna siendo arrastrada
        this.hoveredColumn = e.currentTarget;
        this.hoveredColumn.classList.add("drag-hovered");
        
        e.preventDefault();
    }

    drop(e) {
        this.clearDragStyles(); // Limpiar estilos de columna siendo arrastrada

        this.moveColumn();
        e.preventDefault();
    }

    moveColumn() {
        this.tableElement.querySelector("thead tr").insertBefore(this.selectedColumn, this.hoveredColumn);
        console.log(this.tableElement.querySelectorAll("tbody tr").length);


        this.tableElement.querySelectorAll("tbody tr").forEach(row => {
            row.insertBefore(row.querySelector(`td[data-property='${this.selectedColumn.dataset.property}']`), row.querySelector(`td[data-property='${this.hoveredColumn.dataset.property}']`))
            console.log(row);
        })
        // this.tableElement.querySelectorAll(`td[data-property='${this.selectedColumn.dataset.property}']`).forEach(cell => {
        //     cell.parentNode.insertBefore(cell, cell.parentElement.querySelector(`td[data-property='${this.hoveredColumn.dataset.property}'`));
        // })
    }

    clearDragStyles() {
        this.tableElement.querySelectorAll("thead th").forEach(th => th.classList.remove("drag-hovered"));
    }

}

new Dragger();