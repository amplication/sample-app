import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AddressController } from "../address.controller";
import { AddressService } from "../address.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  address_1: "exampleAddress_1",
  address_2: "exampleAddress_2",
  city: "exampleCity",
  createdAt: new Date(),
  id: "exampleId",
  state: "exampleState",
  updatedAt: new Date(),
  zip: 42,
};
const CREATE_RESULT = {
  address_1: "exampleAddress_1",
  address_2: "exampleAddress_2",
  city: "exampleCity",
  createdAt: new Date(),
  id: "exampleId",
  state: "exampleState",
  updatedAt: new Date(),
  zip: 42,
};
const FIND_MANY_RESULT = [
  {
    address_1: "exampleAddress_1",
    address_2: "exampleAddress_2",
    city: "exampleCity",
    createdAt: new Date(),
    id: "exampleId",
    state: "exampleState",
    updatedAt: new Date(),
    zip: 42,
  },
];
const FIND_ONE_RESULT = {
  address_1: "exampleAddress_1",
  address_2: "exampleAddress_2",
  city: "exampleCity",
  createdAt: new Date(),
  id: "exampleId",
  state: "exampleState",
  updatedAt: new Date(),
  zip: 42,
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Address", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: AddressService,
          useValue: service,
        },
      ],
      controllers: [AddressController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /addresses", async () => {
    await request(app.getHttpServer())
      .post("/addresses")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /addresses", async () => {
    await request(app.getHttpServer())
      .get("/addresses")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /addresses/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/addresses"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /addresses/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/addresses"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
