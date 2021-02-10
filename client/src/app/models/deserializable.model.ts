export interface Deserializable {
    deserialize(input: string): this;
}