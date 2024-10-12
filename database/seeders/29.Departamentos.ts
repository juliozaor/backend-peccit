import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TblDepartamentos } from 'App/Infraestructura/Datos/Entidad/Departamentos'
export default class extends BaseSeeder {
  public async run() {
    await TblDepartamentos.createMany([
      {
        "id": 9,
        "name": "Caquetá",
        "description": "Caquetá es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Florencia. Está ubicado al sur del país, en la región Amazonia, limitando al norte con Meta y Guaviare, al noreste con Vaupés, al sur con Amazonas y Putumayo, y al oeste con Cauca y Huila. Con 88 965 km² es el tercer departamento más extenso —por detrás de Amazonas y Vichada—. Todos sus municipios forman parte de los territorios focalizados",        
    }, {
        "id": 10,
        "name": "Casanare",
        "description": "Casanare es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Yopal. Está ubicado en la región Orinoquía, limitando al norte con Arauca, al este con Vichada, al sur con Meta y al oeste con Boyacá. Con 44 490\u00A0km² es el décimo departamento más extenso —por detrás de Amazonas, Vichada",        
    }, {
        "id": 11,
        "name": "Cauca",
        "description": "Cauca es uno de los treinta y dos departamentos que, junto al Distrito Capital de Bogotá, conforman la República de Colombia. Su capital y ciudad más poblada es Popayán. Está ubicado al suroccidente del país entre las regiones andina y pacífica, limitando al norte con Valle del Cauca y Tolima, al oriente con Huila, al suroriente con Caquetá, al sur con Putumayo y Nariño, y al noroccidente con el océano Pacífico",        
    }, {
        "id": 12,
        "name": "Cesar",
        "description": "Cesar es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Valledupar. Está ubicado al noreste del país, en las regiones Andina y Caribe, limitando al norte con La Guajira, al este con el Estado Zulia de Venezuela, al sureste con Norte de Santander, al sur con Santander, al suroeste con Bolívar y al oeste con Magdalena.",        
    }, {
        "id": 13,
        "name": "Chocó",
        "description": "Chocó es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Quibdó. Está ubicado al noroeste del país, en las regiones andina y Pacífico, limitando al norte con la República de Panamá y el mar Caribe (océano Atlántico), al este con Antioquia y Risaralda, al sur con Valle del Cauca y al oeste con el océano Pacífico.",        
    }, {
        "id": 14,
        "name": "Córdoba",
        "description": "Córdoba es uno de los 32 departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Montería. Está ubicado al norte del país, en la región Caribe, limitando al norte con el mar Caribe (océano Atlántico), al este con los departamentos de Sucre y Bolívar, y al sur y oeste con el departamento de Antioquia. Con 1\u00A0710\u00A0000 habitantes en 2015, es el octavo departamento más poblado, por detrás de Bogotá, Antioquia, Valle del Cauca, Cundinamarca, Atlántico, Santander y Bolívar. Fue creado por medio de la Ley 9 del 18 de diciembre de 1951, reglamentada el 18 de junio de 1952.",        
    }, {
        "id": 15,
        "name": "Cundinamarca",
        "description": "Cundinamarca es uno de los 32 departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Bogotá, la capital del país. Está ubicado en el centro del país, en la región andina, limitando al norte Boyacá, al este y al sur con Meta, al sur con Huila y al oeste con Tolima y Caldas. Enclavado en su territorio se encuentra el Distrito Capital de Bogotá, al que rodea excepto por su límite suroriental.",        
    }, {
        "id": 17,
        "name": "Guaviare",
        "description": "Guaviare es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es San José del Guaviare. Está ubicado en la región Amazonia, limitando al norte con Meta, al noreste con Vichada, al oeste con Guainía y al sur con Vaupés y Caquetá. Con 77,276 hab. según estimaciones del DANE,5​ es el quinto departamento menos poblado —por delante de Amazonas, San Andrés y Providencia, Guainía y Vaupés— y con 2,04 hab/km², el quinto menos densamente poblado, por delante de Vaupés, Amazonas, Vichada y Guainía, el menos densamente poblado",        
    }, {
        "id": 19,
        "name": "La Guajira",
        "description": "La Guajira (en wayuunaiki: Wajiira o Karibyczonn) es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. La traducción más precisa de su nombre sería «Caribe hermoso» y en wayunaiki antiguo Karive Pala «Mar Caribe» también puede significar Mar del Caribe. Su capital es Riohacha. Está ubicado en el extremo noreste del país, en la región Caribe, limitando al norte y este con el mar Caribe (océano Atlántico), al sureste con el estado Venezolano del Zulia, al sur con el departamento del Cesar y al oeste con el del Magdalena.",        
    }, {
        "id": 20,
        "name": "Magdalena",
        "description": "Magdalena es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Santa Marta. Está ubicado al noreste del país, en la región Caribe. Limita al norte con el mar Caribe, al este con La Guajira, al sureste con Cesar, al sur y oeste con Bolívar y al oeste con Atlántico. Fue uno de los originales nueve estados que conformaron los Estados Unidos de Colombia. El departamento toma el nombre del río Magdalena. Entre sus municipios se encuentra Aracataca, el lugar de nacimiento del premio Nobel de literatura Gabriel García Márquez.",        
    }, {
        "id": 22,
        "name": "Nariño",
        "description": "Nariño es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es San Juan de Pasto. Está ubicado en el extremo suroeste del país, en las regiones andina y pacífica, limitando al norte con Cauca, al este con Putumayo, al sur con las provincias de Esmeraldas, Carchi y Sucumbíos de la República de Ecuador y al oeste con el océano Pacífico. Fue fundado en 1904 con la unión de lo que eran las provincias de Pasto y Obando.",        
    }, {
        "id": 16,
        "name": "Guainía",
        "description": "Guainía (idioma yurí: \"Tierra de muchas aguas\") es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Inírida. Está ubicado al este del país, en la región Amazonia, limitando al norte con Vichada, al este con el Estado de Amazonas de Venezuela, al sur con el brasileño del mismo nombre, al suroeste con Vaupés y al oeste con Guaviare. Con 72 238\u00A0km² es el quinto departamento más extenso —por detrás de Amazonas, Vichada, Caquetá y Meta—, con unos 50 000 habitantes en 2020, el segundo menos poblado, y con 0,56 hab/km², el menos densamente poblado. Antiguamente era una comisaría, pero desde 1991 es oficialmente un departamento",        
    }, {
        "id": 1,
        "name": "Amazonas",
        "description": "Amazonas es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Leticia. Está ubicado en el extremo sur del país, en gran parte al sur de la línea ecuatorial, en la región Amazonia. Limita al norte con Caquetá y Vaupés, al este con el estado brasileño del mismo nombre, al sur con el departamento peruano de Loreto y al oeste con Putumayo. Con 110 000 km² es el departamento más extenso de Colombia, con unos 75\u00A0000 habitantes en 2015, el cuarto menos poblado —por delante de Vichada, Vaupés y Guainía, el menos poblado— y con 0.68\u00A0hab/km², el tercero menos densamente poblado, por delante de Vichada y Guainía, el menos densamente poblado.",        
    }, {
        "id": 2,
        "name": "Antioquia",
        "description": "Antioquia es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Medellín, la segunda ciudad más poblada del país. Está ubicado al noroccidente colombiano, en las regiones Andina y Caribe, limitando al norte con el mar Caribe (océano Atlántico), Córdoba y Bolívar, al este con Santander y Boyacá, al sur con Caldas y Risaralda, y al oeste con Chocó. Con unos 6 500 000 habitantes en 2015 es el departamento más poblado, y con 63 600 km², el sexto más extenso, superado por Amazonas, Vichada, Caquetá, Meta y Guainía.",        
    }, {
        "id": 3,
        "name": "Arauca",
        "description": "Arauca es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es la homónima Arauca. Está ubicado al este del país, en la región Orinoquía, limitando al norte y este con Venezuela, al sur con Vichada y Casanare, y al oeste con Boyacá",        
    }, {
        "id": 4,
        "name": "Atlántico",
        "description": "El Atlántico es uno de los treinta y dos departamentos que, junto a Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Barranquilla. Ubicado en la región Caribe, limita al norte con el mar Caribe, al Oriente con el río Magdalena y al Sur y al Occidente con el departamento de Bolívar. Con unos 2 500 000 habitantes en 2015, es el cuarto departamento más poblado (por detrás de Antioquia, Valle del Cauca y Cundinamarca); con 3019 km² es el tercero menos extenso (por delante de Quindío y San Andrés y Providencia, el menos extenso) y con 815 hab/km² es el segundo más densamente poblado (por detrás de San Andrés y Providencia)",        
    }, {
        "id": 5,
        "name": "Bogotá",
        "description": "Bogotá, oficialmente Bogotá, Distrito Capital​ (antiguamente, Santafé de Bogotá),​ es la capital de la República de Colombia y del departamento de Cundinamarca. Está administrada como distrito capital, y goza de autonomía para la gestión de sus intereses dentro de los límites de la Constitución y la ley.12​18​ A diferencia de los demás distritos de Colombia, Bogotá es una entidad territorial de primer orden, con las atribuciones administrativas que la ley confiere a los departamentos",        
    }, {
        "id": 6,
        "name": "Bolívar",
        "description": "Bolívar es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Cartagena de Indias, sede de la asamblea departamental, mientras que en Turbaco se encuentra la sede de la gobernación. Está ubicado en la región Caribe, limitando al norte con el mar Caribe (océano Atlántico), al noreste con Atlántico, al este con Magdalena y Cesar, al sureste con Santander, al suroeste con Antioquia y al oeste con Córdoba y Sucre.",        
    }, {
        "id": 23,
        "name": "Norte de Santander",
        "description": "Norte de Santander es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es la ciudad de Cúcuta. Es una entidad territorial que goza de autonomía para la administración de los asuntos seccionales y la planificación y promoción del desarrollo económico y social dentro de su territorio, tiene una extensión de 22.648 km², que equivalen al 1.91% del territorio nacional, ubicado en la región nororiental de Colombia. Limita al norte y al este con los estados de Zulia y Táchira de Venezuela, al sur con los departamentos de Boyacá y Santander, y al oeste con Santander y Cesar.",        
    }, {
        "id": 24,
        "name": "Putumayo",
        "description": "Putumayo (Quechua: Putumayu) es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Mocoa y su ciudad más poblada es Puerto Asís. Está ubicado al suroeste del país, en la región Amazónica, limitando al norte con Cauca y Caquetá, al este con Amazonas, al sur con Perú y Ecuador, y al oeste con Nariño. La mayoría de sus municipios hace parte de los territorios focalizados",        
    }, {
        "id": 25,
        "name": "Quindío",
        "description": "Quindío, también llamado El Quindío, es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Armenia. Está ubicado en el centro-oeste del país, en la región andina, limitando al norte con Risaralda, al este con Tolima y al oeste con Valle del Cauca. Con 1845 km² es el segundo departamento menos extenso —por delante de San Andrés y Providencia— y con 306 hab/km², el tercero más densamente poblado, por detrás de San Andrés y Providencia y Atlántico. Pertenece al eje cafetero y a la región paisa",        
    }, {
        "id": 26,
        "name": "Risaralda",
        "description": "Risaralda es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital y ciudad más poblada es Pereira. Está ubicado en el centro-oeste del país, en la región andina, limitando al norte con Antioquia, al este con Caldas y Tolima, al sur con Quindío y Valle del Cauca, y al oeste con Chocó. Con 4140 km² es el cuarto departamento menos extenso",        
    }, {
        "id": 27,
        "name": "San Andrés y Providencia",
        "description": "El archipiélago de San Andrés, Providencia y Santa Catalina (en inglés y criollo sanandresano: Archipelago of San Andrés, Providencia and Santa Catalina) es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es San Andrés. Está ubicado al oeste del mar Caribe (océano Atlántico) en Centroamérica, a 775 km (480 millas náuticas) al noroeste de la costa atlántica del territorio continental del país, y a 220 km (140 millas náuticas) de las costas orientales de Nicaragua",        
    }, {
        "id": 28,
        "name": "Santander",
        "description": "Santander es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Bucaramanga. Está ubicado al noreste del país, en la región andina, limitando al norte con Cesar y Norte de Santander, al este y sur con Boyacá, al oeste con Antioquia y al noroeste con Bolívar.7​ Con unos 2 280 908 habitantes en 2018 es el sexto departamento por población. Recibe su nombre en alusión a Francisco de Paula Santander, prócer de la independencia de la Nueva Granada",        
    }, {
        "id": 30,
        "name": "Tolima",
        "description": "Tolima es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Ibagué. Está ubicado en el centro-oeste del país, en la región andina, limitando al norte con Caldas, al este con Cundinamarca, al sur con Huila y Cauca; y al oeste con Valle del Cauca, Quindío y Risaralda.6​ El río Magdalena atraviesa Tolima de sur a norte.",        
    }, {
        "id": 31,
        "name": "Valle del Cauca",
        "description": "Valle del Cauca es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Cali. Está ubicado en las regiones Andina y del Pacífico, limitando al norte con Chocó y Risaralda, al este con Quindío y Tolima, al sur con Cauca y al oeste con el océano Pacífico. Con 4 600 000 habitantes en 2015 es el segundo departamento más poblado",        
    }, {
        "id": 32,
        "name": "Vaupés",
        "description": "Vaupés es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Mitú. Está ubicado al sureste del país, en la región Amazonía, limitando al norte con el Guaviare y Guainía, al este con Brasil, al sur con Amazonas y al oeste con el Caquetá. Con unos 43 000 habitantes en 2015 es el segundo departamento menos poblado",        
    }, {
        "id": 33,
        "name": "Vichada",
        "description": "Vichada es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Puerto Carreño. Está ubicado al este del país, en las regiones Orinoquía y Amazonia, limitando al norte con Casanare y Arauca, al norte y este con Venezuela, al sur con Guainía, al suroeste con Guaviare y al oeste con Meta.",        
    }, {
        "id": 8,
        "name": "Caldas",
        "description": "Caldas es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Manizales. Está ubicado en el centro del país, en la región andina, limitando al norte con Antioquia, al noreste con Boyacá, al este con Cundinamarca, al sur con Tolima y Risaralda y al oeste con Risaralda. Con 7888\u00A0km² es el quinto departamento menos extenso —por delante de Risaralda, Atlántico, Quindío y San Andrés y Providencia, el menos extenso— y con 125 hab/km², el sexto más densamente poblado, por detrás de San Andrés y Providencia, Atlántico, Quindío, Risaralda y Valle del Cauca",        
    }, {
        "id": 7,
        "name": "Boyacá",
        "description": "Boyacá es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Tunja. Está ubicado en el centro-este del país, en la región andina, limitando al norte con Santander y Norte de Santander, al noreste con Venezuela y Arauca, al este con Casanare,8​9​ al sur con Cundinamarca y al occidente el río Magdalena con los departamentos de Caldas y Antioquia.",        
    }, {
        "id": 18,
        "name": "Huila",
        "description": "Huila es uno de los treinta y dos departamentos que junto con Bogotá, Distrito Capital, conforman la República de Colombia. Su capital y ciudad más poblada es Neiva. Está ubicado al suroeste del país, en la región andina, limitando al norte con Tolima y Cundinamarca, al este con Meta, al sur con Caquetá y al oeste con Cauca.",        
    }, {
        "id": 21,
        "name": "Meta",
        "description": "Meta es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Villavicencio. Está ubicado en el centro del país, en la región Orinoquía, limitando al norte con Bogotá, Distrito Capital, Cundinamarca y Casanare, al este con Vichada, al sur con Guaviare y Caquetá, y al oeste con Huila. Con 85 635 km² es el cuarto departamento más extenso —por detrás de Amazonas, Vichada y Caquetá",        
    }, {
        "id": 29,
        "name": "Sucre",
        "description": "Sucre es uno de los treinta y dos departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es Sincelejo. Está ubicado al norte del país, en la región Caribe, limitando al norte con el mar Caribe (océano Atlántico), al este con Bolívar y al oeste con Córdoba. Con 10 670 km² es el sexto departamento menos extenso",        
    }

    ])
  }
}
