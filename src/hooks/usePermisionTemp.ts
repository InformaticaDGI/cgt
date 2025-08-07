import { useAuthStorage } from "../store/auth-storage";

const LIST_DEP = [
  {
    id: "63b67fbd-1429-4fc4-8af6-e82a74e89b14",
    name: "ALGUARISA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1035",
  },
  {
    id: "6377d524-8267-46ab-983a-831a7929fe39",
    name: "IPMEBG",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1023",
  },
  {
    id: "b7640489-5973-42fa-b2b0-f883cfa4e4f0",
    name: "AGUAS TERMALES, HOTEL",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1027",
  },
  {
    id: "5a2d8470-f8e1-4fcf-b90b-4754a842e379",
    name: "SISOPROGUA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1037",
  },
  {
    id: "cc595deb-3970-4fc1-99ee-acb1f9b00d40",
    name: "SECRETARÍA DE SERVICIOS PÚBLICOS",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "16-00",
  },
  {
    id: "7c70d6d5-cb93-43f2-8452-09a2f1dbf5ec",
    name: "SECRETARÍA DE TRANSPORTE",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "18-00",
  },
  {
    id: "726e8ab1-649f-4922-8cb3-71ddfeb4c55b",
    name: "CONSTRUGUARICO",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1036",
  },
  {
    id: "0525e12c-6276-4107-8bce-bc61fd8190e6",
    name: "CONSTRUVIALGUA",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1039",
  },
  {
    id: "1358d0c3-cde0-4753-bc9e-745003fdbb0a",
    name: "FUNDACIÓN PATRIA SOCIALISTA",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1006",
  },
  {
    id: "228f48a3-fdd9-439a-ac59-79c76bc426b8",
    name: "BUSGUARICO",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1038",
  },
  {
    id: "96325980-dbf7-4f65-9e00-864e3d9d51d5",
    name: "DIGASGUA",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1041",
  },
  {
    id: "7923b7af-7878-4951-bf9e-ef43ddfe3e36",
    name: "CONSTRUSALUD",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1045",
  },
  {
    id: "f9f0eead-95fd-4fb4-baf0-bed96cfb8937",
    name: "IAVHEBG",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "1018",
  },
  {
    id: "09196d4a-cd79-4471-9751-932477d30bd1",
    name: "SECRETARÍA DE SEGURIDAD Y DEFENSA",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: "10-00",
  },
  {
    id: "dbcc7318-4da7-4f71-a52f-700de971abd7",
    name: "DIRECCIÓN DE CUERPO DE BOMBEROS TERRITORIAL",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: "10-8",
  },
  {
    id: "f688feee-5ac2-4563-92a6-8aadd320bc14",
    name: "DIRECCIÓN DE PROTECCIÓN CIVIL",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: "10-9",
  },
  {
    id: "045ae72d-9c56-4699-b91f-bd5ac99d1ce9",
    name: "IAPEBG",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: "1021",
  },
  {
    id: "f4380236-28d3-4442-8c61-af5653e26253",
    name: "IPESGUA",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: "1029",
  },
  {
    id: "3f650b81-39ac-4029-a0d0-39e514ced5c5",
    name: "CEFOPOL GUÁRICO",
    parentId: "8e9b8916-ab6d-45f7-ab5d-ff47951171ca",
    cod_dep: null,
  },
  {
    id: "b3b2ecf9-772b-40d7-901d-dbab856963d4",
    name: "SECRETARÍA DE PROTECCIÓN SOCIAL",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "05-00",
  },
  {
    id: "8fcb0fd7-8f74-4dd1-96d3-e14c31491219",
    name: "SECRETARÍA DE SALUD PÚBLICA",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "08-00",
  },
  {
    id: "ea72e9fb-31f1-419a-be01-c1ce23a7b086",
    name: "FUSAMIEBG",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1001",
  },
  {
    id: "4dedc543-e9ed-437f-813b-966ed54edaf4",
    name: "ASOMECID",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1009",
  },
  {
    id: "dc1e94fa-3c94-4262-a24f-f61ad9a9ec9d",
    name: "IRDEBG",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1003",
  },
  {
    id: "9957855a-b4b4-4a51-b435-09bab7b19fef",
    name: "IMUBGUA",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1019",
  },
  {
    id: "e7527a84-0b2b-4f78-891d-6149f6298a29",
    name: "FUNDACULGUA",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1000",
  },
  {
    id: "ccb58433-95e5-4631-a306-728d4e5357cc",
    name: "FUNDACIÓN REGIONAL “EL NIÑO SIMÓN”",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1008",
  },
  {
    id: "1d9929d3-d1f4-4f93-9087-d9fc145b1044",
    name: "SECRETARÍA DE EDUCACIÓN, CULTURA Y DEPORTE",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "07-00",
  },
  {
    id: "02879fbe-7f6d-4a04-a50d-585d96aa4e6f",
    name: "FOSIJEG",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1032",
  },
  {
    id: "383b4ffb-c0e3-443e-920c-f7a1f1e53cea",
    name: "FOSEG",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1033",
  },
  {
    id: "13f4e99a-1339-42dd-9f9f-d9737a155c0c",
    name: "RED DE BIBLIOTECAS PÚBLICAS",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1017",
  },
  {
    id: "315f855d-670c-46a9-8f16-00b4f8ead01d",
    name: "SECRETARÍA DE GESTIÓN TERRITORIAL",
    parentId: "fa3b578b-8d7d-4f52-ac81-716576a1d5c4",
    cod_dep: "11-00",
  },
  {
    id: "e8d3f36a-a6ed-4848-ac59-f3666f74e951",
    name: "EMCOMUNA",
    parentId: "fa3b578b-8d7d-4f52-ac81-716576a1d5c4",
    cod_dep: "1010",
  },
  {
    id: "ccfa1ff6-0a6a-41c8-86e1-87e6fc730766",
    name: "INSTITUTO DE ECOSOCIALISMO",
    parentId: "4c927d8b-a97f-4103-b2ce-4302dd8c440e",
    cod_dep: null,
  },
  {
    id: "1e3f7cbc-8d0b-408c-8d21-ec092036d0fc",
    name: "INCITEBG",
    parentId: "4c927d8b-a97f-4103-b2ce-4302dd8c440e",
    cod_dep: "1005",
  },
  {
    id: "ce2d5e33-0665-4949-94a5-368ef1c8f7c0",
    name: "SECRETARÍA DE EDUCACIÓN UNIVERSITARIA",
    parentId: "4c927d8b-a97f-4103-b2ce-4302dd8c440e",
    cod_dep: "09-00",
  },
  {
    id: "b97a0aa6-92fa-4037-aa81-9e82730217d5",
    name: "ALCARAVÁN SISTEMAS TECNOLÓGICOS",
    parentId: "4c927d8b-a97f-4103-b2ce-4302dd8c440e",
    cod_dep: "1048",
  },
  {
    id: "35cd3099-874e-437a-b358-dc4e20daca39",
    name: "SECRETARÍA DE INDUSTRIA Y COMERCIO",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "19-00",
  },
  {
    id: "b3de53a6-c965-43eb-af33-374a02db4705",
    name: "FONDO DE DESARROLLO REGIONAL (FONDER)",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1016",
  },
  {
    id: "31b00143-72cd-4c76-add4-573b237d4433",
    name: "SECRETARÍA DE ALIMENTACIÓN",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "12-00",
  },
  {
    id: "59967292-a1d9-420d-9325-3bfc510beac9",
    name: "SECRETARÍA DE PRODUCCIÓN AGROPECUARIA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "21-00",
  },
  {
    id: "d515d6fb-0047-47e4-bdeb-48159132f311",
    name: "FODESOPREGUA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1004",
  },
  {
    id: "c6b0726f-e33d-455d-9a5a-7ce4876dcb43",
    name: "CORPOTUREBG",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1043",
  },
  {
    id: "cc4f2f38-dc3c-4ef9-b6fa-bc4b7f0231cc",
    name: "AGROGUARICO PORTENCIA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1028",
  },
  {
    id: "27e60323-e3e0-4bae-9960-567b8523dbdd",
    name: "CORPOGUARICO PORTENCIA",
    parentId: "ebb9a497-9e97-40af-a7b7-47022184b755",
    cod_dep: "1042",
  },
  {
    id: "3bac44ca-54ea-4495-9107-34cacb3cb14a",
    name: "SECRETARÍA DE OBRAS PÚBLICAS",
    parentId: "c6b20b7d-7878-4969-a2ec-a90a451b661a",
    cod_dep: "20-00",
  },
  {
    id: "f92a6fbd-5167-43af-bc02-80d8bf3dafc4",
    name: "INJUVEBG",
    parentId: "b8c1e048-0937-4847-872f-ae0005dbc3b6",
    cod_dep: "1012",
  },
  {
    id: "645095d4-7b37-480b-bdda-9bcd727c7efc",
    name: 'SECRETARIA DE FINANZAS ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "d5c0071c-461b-405f-9d34-1f1bfa601aa6",
    name: 'SECRETARIA DE PLANIFICACIÓN Y PRESUPUESTO ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "b351672c-4983-4b28-9569-cc103e216d06",
    name: 'SECRETARIA DE INSPECCIÓN Y CONTROL',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "e9712ad1-6e9d-44ea-aecb-59495ef7b8c2",
    name: 'SECRETARIA DE COMUNICACIÓN E INFORMACIÓN ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "08063971-7669-4ffa-a76a-8383b7adf33c",
    name: 'DIRECCIÓN GENERAL DE AUDITORÍA INTERNA ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "18d1adb9-c4b2-4d5f-a231-8032583f01ff",
    name: 'DIRECCIÓN GENERAL DE INFORMÁTICA ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "78bdbb3b-be7d-4567-82e2-f7d4c2249d5f",
    name: 'DIRECCIÓN GENERAL DE TALENTO HUMANO ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "afe58d93-54cd-4cef-9c15-18d73ae4d97b",
    name: 'CONSULTORÍA JURÍDICA ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "16370576-f743-4a84-b6af-ebad03904370",
    name: 'FONDEFIBG',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "27d27a8a-a816-4141-af00-80a7bbc1db3e",
    name: 'COPLAN',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "22782a3a-dbcd-49d3-975f-7ae249477add",
    name: 'SUATEBG',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "fff59f2b-a6b1-45ac-b950-9453240366ce",
    name: 'SIBCIGUARICO ',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
},
{
    id: "7b984653-fb58-4489-bc61-6cb2569b203b",
    name: 'PROCURADURÍA',
    parentId: "b91b2c80-b50a-4378-afa3-3f9f8953a593",
    cod_dep: null
}
];

const usePermision = (rootOnly = false) => {
  const { user } = useAuthStorage();
  if (!user) return [];
  const {
    role: { name },
    institution,
  } = user;

  if (name === "Admin" || name === "Superusuario") {
    return LIST_DEP.map((item) => (rootOnly ? item.parentId : item.id));
  }

  return LIST_DEP.filter((item) => item.cod_dep == institution).map((item) =>
    rootOnly ? item.parentId : item.id
  );
};

export default usePermision;
