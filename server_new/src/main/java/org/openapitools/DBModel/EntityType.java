package org.openapitools.DBModel;

public enum EntityType {
    VEGETABLE ("vegetable"),
    FRUIT ("fruit");
    private String title;
    EntityType(String title){this.title = title;}
    @Override
    public String toString(){
        return this.title;
    }
}
