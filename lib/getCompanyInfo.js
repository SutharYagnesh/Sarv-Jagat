import connectDB from '@/lib/db';
import CompanyInfo from '@/lib/models/CompanyInfo';
import { DEFAULT_COMPANY_INFO } from '@/lib/useCompanyInfo';

export async function getCompanyInfo() {
  try {
    await connectDB();
    const info = await CompanyInfo.findOne().lean();
    if (info) {
      return {
        ...DEFAULT_COMPANY_INFO,
        ...JSON.parse(JSON.stringify(info)),
      };
    }
  } catch (err) {
    console.error('Failed to get company info on server:', err);
  }
  return DEFAULT_COMPANY_INFO;
}
