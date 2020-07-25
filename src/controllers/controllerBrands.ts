import Brands from "../models/Brands";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { Op, literal } from "sequelize";
import { param } from "jquery";

export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  createdAt?: string;
  pageSize?: string;
  current?: string;
  featured?: string;
}

export const getBrands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: SearchParams = req.query;

  let where = {};
  const order: any = [];

  if (params.name)
    where = {
      ...where,
      name: {
        [Op.like]: `${params.name}%`,
      },
    };
  if (params.active)
    where = { ...where, active: params.active.toLowerCase() === "true" };
  if (params.createdAt) where = { ...where, createdAt: params.createdAt };
  if (params.sorter) {
    const sorting = params.sorter.split("_");
    order.push([
      sorting[0],
      sorting[1].toLowerCase() === "ascend" ? "ASC" : "DESC",
    ]);
  }
  if (params.featured)
    where = { ...where, featured: params.featured.toLowerCase() === "true" };

  const data = await Brands.scope("website").findAll({
    where,
    order,
    limit: params.name ? undefined : parseInt(params.pageSize || "20"), // For now as bug in sequlize
  });
  return res.status(httpStatus.OK).json({ data });
};

export const getBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id }: any = req.params;

  const data = await Brands.findByPk(id);

  return res.json({
    data: data,
  });
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let values = req.body;
  values = {
    ...values,
    logo: values.logo && values.logo.length > 0 ? values.logo[0]?.url : null,
    storyCover:
      values.storyCover && values.storyCover.length > 0
        ? values.storyCover[0]?.url
        : null,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Brands.create(values).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.CREATED).json({ data });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  let values = req.body;
  values = {
    ...values,
    logo: values.logo && values.logo.length > 0 ? values.logo[0]?.url : null,
    storyCover:
      values.storyCover && values.storyCover.length > 0
        ? values.storyCover[0]?.url
        : null,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Brands.update(values, { where: { id } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data });
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ids = req.query;
  const araryOfids: any[] = Object.values(ids);
  await Brands.destroy({ where: { id: araryOfids } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).send();
};

export const toggleActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = Brands.update(
    { active: literal("NOT active") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};

export const togglePopularStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = Brands.update(
    { popularity: literal("NOT popularity") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};

export const uploadImage = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  const data = req.file;
  return res.status(httpStatus.OK).json({ data });
};
