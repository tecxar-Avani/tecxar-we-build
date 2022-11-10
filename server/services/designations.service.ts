import { HttpException } from '@exceptions/HttpException';
import { ICreateDesignation, IUpdateDesignation } from '@/interfaces/designations.interface';
import { ClientDB } from '@/interfaces/sequelize.client.interface';
import Designation from '@/models/client/designations.model';
import { isEmpty } from '@/utils/util';
import { Op, col, fn } from 'sequelize';
import User from '@/models/client/users.model';
class DesignationsService {
  private designations: typeof Designation;
  constructor(public clientDB: ClientDB) {
    this.designations = clientDB.designations;
  }

  public async createDesignation(designationData: ICreateDesignation): Promise<ICreateDesignation> {
    if (isEmpty(designationData)) {
      throw new HttpException(400, 'Enter the Designation Data');
    }
    const createDesignationData: ICreateDesignation = await this.designations.create({ ...designationData });
    const designation = createDesignationData.get({ plain: true });
    return designation;
  }

  public async getDesignations(page?: number, size?: number, q?: string): Promise<IDesignationRowsCountResponse> {
    const limit: number = size ? +size : 5;
    const offset: number = page ? (page - 1) * limit : 0;
    let whereCondition2: Object = { is_deleted: false };
    if (q != '' && q != 'undefined' && q != undefined) {
      q = q.toLowerCase();
      whereCondition2 = {
        [Op.and]: [
          {
            [Op.or]: [
              {
                '$Designation.name$': {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                '$created_by_user.first_name$': {
                  [Op.iLike]: `%${q}%`,
                },
              },
              {
                '$created_by_user.last_name$': {
                  [Op.iLike]: `%${q}%`,
                },
              },
            ],
          },
          {
            is_deleted: false,
          },
        ],
      };
    }

    var allConditions: Object = {
      attributes: { exclude: ['is_deleted', 'created_by', 'updated_by', 'createdAt', 'updatedAt'], include: [[fn('concat', col('created_by_user.first_name'), ' ', col('created_by_user.last_name')), 'fullName']] },
      where: whereCondition2,
      subQuery: false,

      include: [
        {
          model: User,
          as: 'created_by_user',
          attributes: ['first_name', 'last_name'],
        },
      ],

      order: [['id', 'DESC']],
      limit: limit,
      offset: offset,
      
    };

    const count: number = await this.designations.count(allConditions);
    const getDesignations: ICreateDesignation[] = await Designation.findAll(allConditions);
    return {
      status: true,
      count: count,
      rows: getDesignations.map(ele => ele.get({ plain: true })),
    };
  }
  public async getDesignationById(id: number): Promise<ICreateDesignation | null> {
    if (isEmpty(id)) {
      throw new HttpException(400, 'Enter ID');
    }
    const designation: ICreateDesignation | null = await this.designations.findOne({
      where: { id: id, is_deleted: false },
    });
    if (!designation) {
      return null;
    } else {
      return designation.get({ plain: true });
    }
  }


  public async UpdateDesignation(designationId: number, designationData: IUpdateDesignation): Promise<IUpdateDesignation | null> {
    const findDesignation: IUpdateDesignation | null = await this.designations.findOne({ where: { id: designationId, is_deleted: false } });
    if (!findDesignation) throw new HttpException(400, 'Designation not found');
    await this.designations.update({ ...designationData }, { where: { id: designationId, is_deleted: false }, individualHooks: true });
    const updateDesignationData: IUpdateDesignation | null = await this.designations.findByPk(designationId, { raw: true });
    return updateDesignationData;
  }

  public async deleteDesignation(designationId: number): Promise<boolean> {
    if (isEmpty(designationId)) throw new HttpException(400, 'Enter ID');
    const findDesignation: ICreateDesignation | null = await this.designations.findOne({ where: { id: designationId, is_deleted: false } });
    if (!findDesignation) throw new HttpException(409, 'Designation not found');
    const affectedCount: [number] = await this.designations.update({ is_deleted: true }, { where: { id: designationId }, individualHooks: true });
    return affectedCount[0] > 0;
  }


  public async getAllDesignations(): Promise<IAllDesignationList[]> {
    const getAllDesignations: IAllDesignationList[] = await this.designations.findAll({
      attributes: ['id', 'name'],
      where: { is_deleted: false },
    });
    return getAllDesignations.map(ele => ele.get({ plain: true }));
  }
}

export default DesignationsService;
