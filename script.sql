/* nftdb */

CREATE SCHEMA IF NOT EXISTS maestros AUTHORIZATION postgres;

CREATE TABLE maestros.precios(
	precio_id SMALLINT GENERATED ALWAYS AS IDENTITY,
	descripcion VARCHAR(250) NOT NULL,
	activo BOOL DEFAULT TRUE,
	PRIMARY KEY (precio_id)
);

CREATE TABLE maestros.unidades_medida(
	unidad_medida_id SMALLINT GENERATED ALWAYS AS IDENTITY,
	descripcion VARCHAR(150) NOT NULL,
	simbolo VARCHAR(20) NOT NULL,
	activo BOOL DEFAULT TRUE,
	PRIMARY KEY (unidad_medida_id)
);

CREATE TABLE maestros.productos (
	producto_id INT GENERATED ALWAYS AS IDENTITY,
	codigo VARCHAR(20) NOT NULL,
	descripcion VARCHAR(150) NOT NULL,
	descripcion_corta VARCHAR(150) NOT NULL,
	unidad_medida_id SMALLINT NOT NULL,
	ubicacion VARCHAR(150) NULL,
	activo BOOL DEFAULT TRUE,
	PRIMARY KEY (producto_id),
	CONSTRAINT fk_unidad_medida FOREIGN KEY(unidad_medida_id) REFERENCES maestros.unidades_medida(unidad_medida_id)  
);

CREATE TABLE maestros.productos_precios(
	producto_precio_id int GENERATED ALWAYS AS IDENTITY,
	producto_id INT NOT NULL,
	precio_id SMALLINT NOT NULL,
	importe NUMERIC(10,4) DEFAULT 0,
	activo BOOL DEFAULT TRUE,
	PRIMARY KEY (producto_precio_id),
	CONSTRAINT fk_producto_id FOREIGN KEY(producto_id) REFERENCES maestros.productos(producto_id),
	CONSTRAINT fk_precio_id FOREIGN KEY(precio_id) REFERENCES maestros.precios(precio_id)	
);


