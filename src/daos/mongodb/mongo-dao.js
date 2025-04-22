export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    // Obtener todo
    getAll = async () => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error);
        }
    };

    // Obtener por ID
    getById = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    // Crear
    create = async (product) => {
        try {
            return await this.model.create(product);
        } catch {
            throw new Error(error)
        }
    };

    // Actualizar
    update = async (id, obj) => {
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true });
        } catch (error) {
            throw new Error(error);
        }
    };

    // Eliminar
    delete = async (id) => {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    };

}