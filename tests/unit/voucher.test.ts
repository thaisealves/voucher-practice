import voucherService from "../../src/services/voucherService";
import voucherRepository from "../../src/repositories/voucherRepository";
import * as errors from "../../src/utils/errorUtils";
import { faker } from "@faker-js/faker";
describe("Creating unit tests to the voucherService", () => {
  it("Testing the createVoucher with new code", async () => {
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(null);
    const voucher = faker.random.alphaNumeric();
    await voucherService.createVoucher(voucher, 50);
    expect(voucherService.createVoucher).toBeCalled;
  });

  it("Don't insert data if code is repeated", async () => {
    const voucher = faker.random.alphaNumeric();
    await voucherService.createVoucher(voucher, 50);
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id: 1,
      code: voucher,
      discount: 50,
      used: false,
    });
    const data = await voucherService.createVoucher(voucher, 50);
    expect(data).rejects.toEqual(
      errors.conflictError("Voucher already exist.")
    );
  });
});

// { applyVoucher, createVoucher }
