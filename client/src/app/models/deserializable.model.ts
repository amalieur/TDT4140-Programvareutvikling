export interface Deserializable {
    deserialize(input: Object): this;
}