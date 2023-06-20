import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CreateCourierLocationDto } from './dto/courier.dto';
import { AppService } from './App.service';

describe('App Controller', () => {
  let controller: AppController;
  let service: AppService;
  const createCourierLocationDto: CreateCourierLocationDto = {
    courierID: 1234,
    lat: 36.3,
    long: 23.8,
    created: new Date(),
  };

  const mockCourierLocation = {
    courierID: 1234,
    lat: 36.3,
    long: 23.8,
    created: new Date(),
    _id: 'a id',
  };

  beforeEach(async () => {
    const mockCourierLocationModel = {};
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'CourierLocationModel',
          useValue: mockCourierLocationModel,
        },
      ],
    }).compile();

    controller = moduleRef.get<AppController>(AppController);
    service = moduleRef.get<AppService>(AppService);
  });

  describe('create()', () => {
    it('should create a new location info', async () => {
      const createNewLocationSpy = jest.spyOn(service, 'createNewLocation');

      await controller.saveNewLocation(createCourierLocationDto);

      expect(createNewLocationSpy).toHaveBeenCalledWith(mockCourierLocation);
    });
  });
});
