class GameObject {

  constructor(name = "NO_NAME", layer = 0, isStatic = false) {
    this.components = [];
    this.markForDelete = false;
    this.name = name;
    this.visible = true;
    this.layer = layer;
    this.isStatic = isStatic;
  }

  update(ctx) {
    this.components.filter(c=>c.update).forEach(c=>c.update(ctx));
  }

  draw(ctx) {
    if(!this.visible) return;
    this.components.filter(c=>c.draw).forEach(c=>c.draw(ctx));
  }

  getComponent(componentString) {
    return this.components.find(c=>c.constructor.name == componentString);
  }

  addComponent(component) {
    this.components.push(component);
    component.parent = this;
    return this;
  }

  getFirstComponentOfType(type) {
    return this.components.find(c=>c instanceof type);
  }
}

export default GameObject;
