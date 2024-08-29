export abstract class AbstractMapper<Model, Entity> {
  /**
   * Abstract method to transform a model into an entity.
   *
   * @param {Model} model - The model object.
   * @returns {Entity} - The transformed entity.
   */
  abstract toEntity(model: Model): Entity;

  /**
   * Optional method to transform an array of models into an array of entities.
   *
   * @param {Model[]} models - The array of model objects.
   * @returns {Entity[]} - The array of transformed entities.
   */
  toEntities(models: Model[]): Entity[] {
    return models.map((model) => this.toEntity(model));
  }
}
