import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import University from '../models/University.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root of the server directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const sampleUniversities = [
  // Top US
  { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA', ranking: 1, acceptanceRate: 4, employmentRate: 98, avgSalary: 120000 },
  { name: 'Stanford University', country: 'USA', ranking: 2, acceptanceRate: 4, employmentRate: 98, avgSalary: 125000 },
  { name: 'Harvard University', country: 'USA', ranking: 3, acceptanceRate: 3, employmentRate: 96, avgSalary: 110000 },
  { name: 'California Institute of Technology (Caltech)', country: 'USA', ranking: 4, acceptanceRate: 4, employmentRate: 97, avgSalary: 115000 },
  { name: 'University of Chicago', country: 'USA', ranking: 5, acceptanceRate: 5, employmentRate: 95, avgSalary: 100000 },
  { name: 'University of Pennsylvania', country: 'USA', ranking: 6, acceptanceRate: 6, employmentRate: 96, avgSalary: 105000 },
  { name: 'Cornell University', country: 'USA', ranking: 7, acceptanceRate: 7, employmentRate: 94, avgSalary: 95000 },
  { name: 'Columbia University', country: 'USA', ranking: 8, acceptanceRate: 4, employmentRate: 95, avgSalary: 102000 },
  { name: 'Princeton University', country: 'USA', ranking: 9, acceptanceRate: 4, employmentRate: 94, avgSalary: 98000 },
  { name: 'Yale University', country: 'USA', ranking: 10, acceptanceRate: 4, employmentRate: 95, avgSalary: 100000 },
  // Top UK
  { name: 'University of Oxford', country: 'UK', ranking: 11, acceptanceRate: 14, employmentRate: 95, avgSalary: 85000 },
  { name: 'University of Cambridge', country: 'UK', ranking: 12, acceptanceRate: 15, employmentRate: 95, avgSalary: 85000 },
  { name: 'Imperial College London', country: 'UK', ranking: 13, acceptanceRate: 14, employmentRate: 94, avgSalary: 82000 },
  { name: 'University College London (UCL)', country: 'UK', ranking: 14, acceptanceRate: 16, employmentRate: 92, avgSalary: 75000 },
  { name: 'University of Edinburgh', country: 'UK', ranking: 15, acceptanceRate: 40, employmentRate: 91, avgSalary: 70000 },
  { name: 'King\'s College London', country: 'UK', ranking: 16, acceptanceRate: 47, employmentRate: 90, avgSalary: 68000 },
  { name: 'London School of Economics (LSE)', country: 'UK', ranking: 17, acceptanceRate: 9, employmentRate: 93, avgSalary: 80000 },
  { name: 'University of Manchester', country: 'UK', ranking: 18, acceptanceRate: 56, employmentRate: 89, avgSalary: 65000 },
  // Top Canada
  { name: 'University of Toronto', country: 'Canada', ranking: 19, acceptanceRate: 43, employmentRate: 92, avgSalary: 75000 },
  { name: 'McGill University', country: 'Canada', ranking: 20, acceptanceRate: 46, employmentRate: 90, avgSalary: 70000 },
  { name: 'University of British Columbia', country: 'Canada', ranking: 21, acceptanceRate: 45, employmentRate: 91, avgSalary: 72000 },
  { name: 'University of Waterloo', country: 'Canada', ranking: 22, acceptanceRate: 53, employmentRate: 95, avgSalary: 85000 },
  { name: 'McMaster University', country: 'Canada', ranking: 23, acceptanceRate: 58, employmentRate: 89, avgSalary: 68000 },
  // Top Australia
  { name: 'University of Melbourne', country: 'Australia', ranking: 24, acceptanceRate: 70, employmentRate: 90, avgSalary: 65000 },
  { name: 'University of Sydney', country: 'Australia', ranking: 25, acceptanceRate: 30, employmentRate: 91, avgSalary: 67000 },
  { name: 'University of New South Wales (UNSW)', country: 'Australia', ranking: 26, acceptanceRate: 40, employmentRate: 92, avgSalary: 68000 },
  { name: 'Australian National University (ANU)', country: 'Australia', ranking: 27, acceptanceRate: 35, employmentRate: 89, avgSalary: 64000 },
  { name: 'Monash University', country: 'Australia', ranking: 28, acceptanceRate: 40, employmentRate: 88, avgSalary: 62000 },
  // Top Indian (IITs, NITs, BITS)
  { name: 'Indian Institute of Technology Bombay (IITB)', country: 'India', ranking: 29, acceptanceRate: 1, employmentRate: 98, avgSalary: 25000 },
  { name: 'Indian Institute of Technology Delhi (IITD)', country: 'India', ranking: 30, acceptanceRate: 1, employmentRate: 97, avgSalary: 24000 },
  { name: 'Indian Institute of Technology Madras (IITM)', country: 'India', ranking: 31, acceptanceRate: 1, employmentRate: 96, avgSalary: 23000 },
  { name: 'Indian Institute of Technology Kanpur (IITK)', country: 'India', ranking: 32, acceptanceRate: 1, employmentRate: 95, avgSalary: 22000 },
  { name: 'Indian Institute of Technology Kharagpur (IITKgp)', country: 'India', ranking: 33, acceptanceRate: 1, employmentRate: 94, avgSalary: 21000 },
  { name: 'Indian Institute of Science (IISc Bangalore)', country: 'India', ranking: 34, acceptanceRate: 1, employmentRate: 98, avgSalary: 26000 },
  { name: 'Indian Institute of Technology Roorkee (IITR)', country: 'India', ranking: 35, acceptanceRate: 1, employmentRate: 93, avgSalary: 20000 },
  { name: 'Indian Institute of Technology Guwahati (IITG)', country: 'India', ranking: 36, acceptanceRate: 1, employmentRate: 92, avgSalary: 19000 },
  { name: 'BITS Pilani', country: 'India', ranking: 37, acceptanceRate: 3, employmentRate: 95, avgSalary: 20000 },
  { name: 'National Institute of Technology Trichy (NITT)', country: 'India', ranking: 38, acceptanceRate: 2, employmentRate: 92, avgSalary: 18000 },
  { name: 'Vellore Institute of Technology (VIT)', country: 'India', ranking: 39, acceptanceRate: 15, employmentRate: 88, avgSalary: 10000 },
  { name: 'Delhi Technological University (DTU)', country: 'India', ranking: 40, acceptanceRate: 3, employmentRate: 91, avgSalary: 17000 },
  { name: 'Jadavpur University', country: 'India', ranking: 41, acceptanceRate: 4, employmentRate: 90, avgSalary: 15000 },
  { name: 'Anna University', country: 'India', ranking: 42, acceptanceRate: 10, employmentRate: 85, avgSalary: 11000 },
  { name: 'Manipal Academy of Higher Education (MAHE)', country: 'India', ranking: 43, acceptanceRate: 20, employmentRate: 84, avgSalary: 9000 },
  // Europe & Asia
  { name: 'National University of Singapore (NUS)', country: 'Singapore', ranking: 44, acceptanceRate: 5, employmentRate: 95, avgSalary: 80000 },
  { name: 'Nanyang Technological University (NTU)', country: 'Singapore', ranking: 45, acceptanceRate: 6, employmentRate: 94, avgSalary: 78000 },
  { name: 'Tsinghua University', country: 'China', ranking: 46, acceptanceRate: 2, employmentRate: 96, avgSalary: 50000 },
  { name: 'Peking University', country: 'China', ranking: 47, acceptanceRate: 2, employmentRate: 95, avgSalary: 48000 },
  { name: 'ETH Zurich', country: 'Switzerland', ranking: 48, acceptanceRate: 27, employmentRate: 95, avgSalary: 90000 },
  { name: 'EPFL', country: 'Switzerland', ranking: 49, acceptanceRate: 20, employmentRate: 94, avgSalary: 88000 },
  { name: 'University of Tokyo', country: 'Japan', ranking: 50, acceptanceRate: 10, employmentRate: 93, avgSalary: 55000 }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully.');

    // Add some sample programs to all universities
    const enrichedUniversities = sampleUniversities.map((uni) => {
      let tuitionRange = uni.country === 'India' ? 3000 : (uni.country === 'USA' ? 50000 : 30000);
      
      return {
        ...uni,
        programs: [
          {
            name: 'Master of Science in Computer Science',
            duration: '2 years',
            tuitionFee: tuitionRange,
            intake: ['Fall 2024', 'Spring 2025'],
            requiredScores: { 'GRE': '315', 'TOEFL': '100' }
          },
          {
            name: 'Master of Business Administration',
            duration: '2 years',
            tuitionFee: tuitionRange * 1.5,
            intake: ['Fall 2024'],
            requiredScores: { 'GMAT': '680', 'IELTS': '7.0' }
          }
        ]
      };
    });

    console.log(`Clearing existing University collection...`);
    await University.deleteMany({});
    
    console.log(`Inserting ${enrichedUniversities.length} universities...`);
    await University.insertMany(enrichedUniversities);
    
    console.log(`✅ Seeding complete! Database populated with ${enrichedUniversities.length} sample universities.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:');
    console.error(error);
    process.exit(1);
  }
};

seedDB();
