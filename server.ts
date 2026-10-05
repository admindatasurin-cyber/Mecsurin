import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("medical_center.db");

// Initialize Database Schemas for Surin Medical Education Center (CPIRD)
db.exec(`
  CREATE TABLE IF NOT EXISTS academic_conferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    department TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    speaker TEXT NOT NULL,
    venue TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rotation_schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_year TEXT NOT NULL,
    batch_name TEXT NOT NULL,
    department TEXT NOT NULL,
    duration TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    course_director TEXT NOT NULL,
    objectives TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS faculty_members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    academic_title TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    specialty TEXT NOT NULL,
    image TEXT NOT NULL,
    education TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS educational_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_type TEXT NOT NULL DEFAULT 'PDF',
    file_size TEXT NOT NULL DEFAULT '1.2 MB',
    update_date TEXT NOT NULL,
    description TEXT NOT NULL,
    download_url TEXT NOT NULL DEFAULT '#',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    is_pinned INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS facilities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    hours TEXT NOT NULL,
    image TEXT NOT NULL,
    features TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Reset and Seed Academic Conferences
const confCount = (db.prepare("SELECT COUNT(*) as count FROM academic_conferences").get() as any).count;
if (confCount === 0) {
  const insertConf = db.prepare(`
    INSERT INTO academic_conferences (title, type, department, date, time, speaker, venue, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertConf.run(
    'Grand Round: Approach to Acute Coronary Syndrome & High-Risk Interventions',
    'Grand Round',
    'อายุรศาสตร์',
    '2026-10-08',
    '08:00 - 09:00',
    'ผศ.พิเศษ นพ. ธีรภัทร์ สิริโชคอนันต์ (อาจารย์แพทย์โรคหัวใจ)',
    'ห้องประชุมมงคลนพรัตน์ ชั้น 4 ศูนย์แพทย์ฯ',
    'การอภิปรายผู้ป่วยจริงและทบทวนเวชปฏิบัติล่าสุดในการดูแลผู้ป่วยโรคหลอดเลือดหัวใจเฉียบพลัน สำหรับ นศพ.ชั้นปีที่ 5-6 และแพทย์เพิ่มพูนทักษะ'
  );

  insertConf.run(
    'Pediatric Morning Conference: Neonatal Sepsis & Early Antibiotic Stewardship',
    'Morning Conference',
    'กุมารเวชศาสตร์',
    '2026-10-09',
    '07:30 - 08:30',
    'พญ. นภัสสร วงศ์ประเสริฐ (หัวหน้าภาควิชากุมารเวชศาสตร์)',
    'ห้องเรียนสัมมนา 2 ชั้น 3 ศูนย์แพทย์ฯ',
    'การนำเสนอเคสทารกแรกเกิดติดเชื้อในกระแสเลือด และแนวทางการเลือกใช้ยาปฏิชีวนะอย่างสมเหตุผล'
  );

  insertConf.run(
    'Journal Club: Minimally Invasive Arthroscopic Surgery in Sports Injuries',
    'Journal Club',
    'ศัลยศาสตร์ออร์โธปิดิกส์',
    '2026-10-14',
    '12:00 - 13:00',
    'นพ. วรเมธ รัตนเกียรติกุล (อาจารย์ประจำกลุ่มงานกระดูกและข้อ)',
    'ห้องบรรยายวิชาการ 1 ชั้น 2 ศูนย์แพทย์ฯ',
    'วิเคราะห์บทความวิจัยระดับนานาชาติจาก New England Journal of Medicine (NEJM) ว่าด้วยประสิทธิผลของการผ่าตัดส่องกล้องในผู้ป่วยข้อเข่าฉีกขาด'
  );

  insertConf.run(
    'Interhospital Conference: Complex Trauma Resuscitation & Damage Control',
    'Interhospital Conference',
    'เวชศาสตร์ฉุกเฉินและศัลยศาสตร์',
    '2026-10-22',
    '13:30 - 15:30',
    'ทีมอาจารย์แพทย์อุบัติเหตุและศัลยแพทย์อุบัติเหตุ รพ.สุรินทร์',
    'ห้องประชุมใหญ่ ชั้น 5 อาคารศูนย์แพทยศาสตรศึกษา',
    'การประชุมแลกเปลี่ยนทางวิชาการร่วมกับโรงพยาบาลชุมชนเครือข่ายจังหวัดสุรินทร์ และแพทย์ประจำบ้านเวชศาสตร์ฉุกเฉิน'
  );
}

// Seed Rotation Schedules
const rotCount = (db.prepare("SELECT COUNT(*) as count FROM rotation_schedules").get() as any).count;
if (rotCount === 0) {
  const insertRot = db.prepare(`
    INSERT INTO rotation_schedules (student_year, batch_name, department, duration, start_date, end_date, course_director, objectives)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertRot.run(
    'ชั้นปีที่ 6 (Extern)',
    'นศพ.รุ่นที่ 18 (CPIRD)',
    'อายุรศาสตร์ (Internal Medicine)',
    '4 สัปดาห์',
    '2026-10-01',
    '2026-10-28',
    'ผศ.พิเศษ นพ. ธีรภัทร์ สิริโชคอนันต์',
    'ฝึกปฏิบัติงานในหอผู้ป่วยวิกฤต (ICU) และหอผู้ป่วยสามัญ รับผิดชอบเป็น First Call ภายใต้การกำกับดูแลของอาจารย์แพทย์'
  );

  insertRot.run(
    'ชั้นปีที่ 5',
    'นศพ.รุ่นที่ 19 (CPIRD)',
    'ศัลยศาสตร์ (General & Trauma Surgery)',
    '6 สัปดาห์',
    '2026-09-15',
    '2026-10-27',
    'นพ. อนันต์ เก่งกาจ',
    'ฝึกทักษะการทำหัตถการพื้นฐาน (Suturing, I&D), การดูแลผู้ป่วยก่อนและหลังผ่าตัด และการเข้าช่วยผ่าตัดในห้องผ่าตัดใหญ่'
  );

  insertRot.run(
    'ชั้นปีที่ 4',
    'นศพ.รุ่นที่ 20 (CPIRD)',
    'เวชศาสตร์ครอบครัวและชุมชน (Family Medicine)',
    '4 สัปดาห์',
    '2026-10-01',
    '2026-10-28',
    'พญ. กานต์พิชชา รักษ์ประชา',
    'การฝึกปฏิบัติงานชุมชน การเยี่ยมบ้าน (Home Visit) และการดูแลผู้ป่วยแบบองค์รวมต่อเนื่อง ณ ศูนย์สุขภาพชุมชนและ รพ.สต. ในเครือข่าย'
  );

  insertRot.run(
    'แพทย์เพิ่มพูนทักษะ (Intern)',
    'แพทย์ฝึกหัด ปี 2569',
    'กุมารเวชศาสตร์ (Pediatrics Ward & NICU)',
    '2 เดือน',
    '2026-09-01',
    '2026-10-31',
    'พญ. นภัสสร วงศ์ประเสริฐ',
    'การดูแลผู้ป่วยเด็กวิกฤต การช่วยฟื้นคืนชีพทารกแรกเกิด (NRP) และการวินิจฉัยโรคติดเชื้อสำคัญในเด็ก'
  );
}

// Seed Faculty Members
const facCount = (db.prepare("SELECT COUNT(*) as count FROM faculty_members").get() as any).count;
if (facCount === 0 || facCount < 4) {
  db.exec("DELETE FROM faculty_members");
  const insertFac = db.prepare(`
    INSERT INTO faculty_members (name, academic_title, role, department, specialty, image, education, email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertFac.run(
    'ผศ.พิเศษ นพ. ชัยรัตน์ พงษ์ศิริวัฒน์',
    'ผู้ช่วยศาสตราจารย์พิเศษ นายแพทย์',
    'ผู้อำนวยการศูนย์แพทยศาสตรศึกษาชั้นคลินิก โรงพยาบาลสุรินทร์',
    'บริหารการศึกษาและอายุรศาสตร์',
    'อายุรศาสตร์ทั่วไปและการจัดการศึกษาแพทยศาสตร์',
    '/src/assets/images/mec_executive_director_1791177148639.jpg',
    'แพทยศาสตรบัณฑิต, วุฒิบัตรอายุรศาสตร์, ประกาศนียบัตรบัณฑิตทางแพทยศาสตรศึกษา (MedEd)',
    'director.mec@cpird.in.th'
  );

  insertFac.run(
    'ผศ.พิเศษ นพ. ธีรภัทร์ สิริโชคอนันต์',
    'ผู้ช่วยศาสตราจารย์พิเศษ นายแพทย์',
    'รองผู้อำนวยการฝ่ายวิชาการและวิจัย / หัวหน้าภาควิชาอายุรศาสตร์',
    'อายุรศาสตร์',
    'อายุรศาสตร์โรคหัวใจและหลอดเลือด',
    '/src/assets/images/doctor_portrait_male_1791176624773.jpg',
    'แพทยศาสตรบัณฑิต เกียรตินิยมอันดับ 1, วุฒิบัตรอายุรศาสตร์โรคหัวใจ, Fellow in Intervention',
    'teerapat.s@cpird.in.th'
  );

  insertFac.run(
    'พญ. นภัสสร วงศ์ประเสริฐ',
    'แพทย์หญิง',
    'หัวหน้าภาควิชากุมารเวชศาสตร์ / ประธานกรรมการสอบ OSCE',
    'กุมารเวชศาสตร์',
    'กุมารเวชศาสตร์และโรคภูมิแพ้',
    '/src/assets/images/doctor_portrait_female_1791176635390.jpg',
    'แพทยศาสตรบัณฑิต, วุฒิบัตรกุมารเวชศาสตร์, อนุสาขาโรคภูมิแพ้และภูมิคุ้มกัน',
    'napatsorn.w@cpird.in.th'
  );

  insertFac.run(
    'นพ. วรเมธ รัตนเกียรติกุล',
    'นายแพทย์เชี่ยวชาญ',
    'หัวหน้าภาควิชาศัลยศาสตร์ออร์โธปิดิกส์ / ผู้ดูแลศูนย์ Simulation Lab',
    'ศัลยศาสตร์ออร์โธปิดิกส์',
    'ศัลยศาสตร์กระดูก ข้อ และเวชศาสตร์การกีฬา',
    '/src/assets/images/doctor_portrait_male_1791176624773.jpg',
    'แพทยศาสตรบัณฑิต, วุฒิบัตรออร์โธปิดิกส์, Fellowship in Arthroscopic Surgery',
    'woramet.r@cpird.in.th'
  );

  insertFac.run(
    'พญ. กานต์พิชชา รักษ์ประชา',
    'แพทย์หญิง',
    'หัวหน้าภาควิชาเวชศาสตร์ครอบครัวและชุมชน / ผู้ประสานงานโครงการ CPIRD',
    'เวชศาสตร์ครอบครัว',
    'เวชปฏิบัติครอบครัวและการดูแลปฐมภูมิ',
    '/src/assets/images/doctor_portrait_female_1791176635390.jpg',
    'แพทยศาสตรบัณฑิต, วุฒิบัตรเวชศาสตร์ครอบครัว, Master of Public Health (MPH)',
    'kanpicha.r@cpird.in.th'
  );
}

// Seed Educational Resources (Download Center)
const resCount = (db.prepare("SELECT COUNT(*) as count FROM educational_resources").get() as any).count;
if (resCount === 0) {
  const insertRes = db.prepare(`
    INSERT INTO educational_resources (title, category, file_type, file_size, update_date, description, download_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertRes.run(
    'คู่มือนักศึกษาแพทย์ชั้นคลินิก ปีการศึกษา 2569 (Student Handbook 2026)',
    'คู่มือนักศึกษา',
    'PDF',
    '4.8 MB',
    '2026-09-20',
    'รวบรวมระเบียบข้อบังคับ หลักสูตรแพทยศาสตรบัณฑิต เกณฑ์การประเมินผล และสิทธิประโยชน์ของนักศึกษาแพทย์',
    '#'
  );

  insertRes.run(
    'แบบฟอร์มขอลาเรียน / ลาป่วย / ลากิจ สำหรับนักศึกษาแพทย์ชั้นคลินิก (Leave Request Form)',
    'แบบฟอร์มคำร้อง',
    'PDF',
    '420 KB',
    '2026-08-15',
    'เอกสารคำร้องขอลาการฝึกปฏิบัติงานบนวอร์ด พร้อมขั้นตอนการเสนอขออนุมัติต่ออาจารย์หัวหน้าภาควิชา',
    '#'
  );

  insertRes.run(
    'เกณฑ์การบันทึกสมุดประสบการณ์และทักษะหัตถการ (Logbook & EPA Guidelines)',
    'คู่มือการประเมิน',
    'PDF',
    '2.1 MB',
    '2026-09-01',
    'คู่มือการบันทึกหัตถการและ Entrustable Professional Activities (EPAs) ตามเกณฑ์แพทยสภา',
    '#'
  );

  insertRes.run(
    'แนวทางการเขียนโครงการวิจัยและยื่นขอจริยธรรมการวิจัยในมนุษย์ (IRB Guidelines)',
    'งานวิจัยนักศึกษา',
    'PDF',
    '1.8 MB',
    '2026-09-10',
    'ขั้นตอนการส่งโครงร่างวิจัย (Proposal) เพื่อขอรับการพิจารณาจากคณะกรรมการจริยธรรมการวิจัยในมนุษย์ รพ.สุรินทร์',
    '#'
  );

  insertRes.run(
    'แบบฟอร์มขอเข้าใช้ห้องฝึกทักษะหัตถการ Simulation Lab นอกเวลาราชการ',
    'แบบฟอร์มคำร้อง',
    'DOCX',
    '310 KB',
    '2026-08-25',
    'สำหรับ นศพ. และแพทย์เพิ่มพูนทักษะที่ต้องการฝึกซ้อมทักษะก่อนการสอบ OSCE หรือทบทวนหัตถการ',
    '#'
  );

  insertRes.run(
    'ระเบียบและข้อปฏิบัติการพักอาศัยในหอพักนักศึกษาแพทย์ ศูนย์แพทย์สุรินทร์',
    'คู่มือนักศึกษา',
    'PDF',
    '850 KB',
    '2026-07-30',
    'ข้อกำหนดด้านความปลอดภัย เวลาเปิด-ปิดหอพัก และการใช้สิ่งอำนวยความสะดวกในหอพักนักศึกษาแพทย์',
    '#'
  );
}

// Seed Announcements
const annCount = (db.prepare("SELECT COUNT(*) as count FROM announcements").get() as any).count;
if (annCount === 0 || annCount < 3) {
  db.exec("DELETE FROM announcements");
  const insertAnn = db.prepare(`
    INSERT INTO announcements (title, category, date, summary, content, is_pinned)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertAnn.run(
    'กำหนดการติวเข้มและสอบประเมินเสมือนจริง National License Step 2 ประจำปีการศึกษา 2569',
    'การสอบวิชาชีพ (NL)',
    '2026-10-02',
    'ศูนย์แพทยศาสตรศึกษาชั้นคลินิก รพ.สุรินทร์ กำหนดจัดติวสรุปเนื้อหาและการสอบ Mock Examination สำหรับ นศพ.ชั้นปีที่ 5 เพื่อเตรียมความพร้อมสู่การสอบ ศรว.',
    'ฝ่ายวิชาการขอแจ้งกำหนดการจัดโครงการเตรียมความพร้อมสอบ National License Step 2 โดยจะมีการบรรยายสรุปเคสสำคัญโดยทีมอาจารย์แพทย์ผู้เชี่ยวชาญทุกภาควิชา พร้อมการทำ Mock Exam ด้วยระบบคอมพิวเตอร์เพื่อจำลองสนามสอบจริง นศพ.ปี 5 ทุกท่านเข้าร่วม ณ ห้องประชุมมงคลนพรัตน์',
    1
  );

  insertAnn.run(
    'ประกาศรับสมัครข้อเสนอโครงการวิจัยนักศึกษาแพทย์ ทุนสนับสนุนประจำปีงบประมาณ 2570',
    'ทุนวิจัยและวิชาการ',
    '2026-09-28',
    'เปิดรับข้อเสนอโครงการวิจัยทางคลินิก (Clinical Research) และเวชศาสตร์ชุมชน ทุนละสูงสุด 25,000 บาท สำหรับ นศพ.ชั้นปีที่ 4 และ 5',
    'เพื่อส่งเสริมการสร้างผลงานทางวิชาการและนวัตกรรมทางการแพทย์ ศูนย์แพทย์สุรินทร์เปิดรับข้อเสนอโครงการวิจัยจาก นศพ. ที่มีอาจารย์แพทย์เป็นที่ปรึกษา โดยเปิดรับเอกสารตั้งแต่บัดนี้จนถึงวันที่ 30 พฤศจิกายน 2569 ทางอีเมล research.mec@cpird.in.th',
    0
  );

  insertAnn.run(
    'เปิดใช้งานอุปกรณ์หุ่นจำลองเสมือนจริงระบบทางเดินหายใจและอัลตราซาวด์รุ่นใหม่ ณ Simulation Lab',
    'สิ่งสนับสนุนการเรียนรู้',
    '2026-09-18',
    'ศูนย์ฝึกทักษะทางการแพทย์เสมือนจริง (Skills Lab) ได้ติดตั้งหุ่นจำลองฝึกกู้ชีพขั้นสูงและ Point-of-Care Ultrasound (POCUS) Trainer พร้อมเปิดให้นักศึกษาจองฝึกซ้อม',
    'ศูนย์แพทยศาสตรศึกษาชั้นคลินิก รพ.สุรินทร์ ได้รับการสนับสนุนงบประมาณจัดซื้อเครื่องจำลองคลื่นเสียงสะท้อนความถี่สูง (Ultrasound Simulator) และหุ่นจำลองใส่ท่อช่วยหายใจยาก สามารถจองเวลาเข้าฝึกซ้อมได้ผ่านระบบหรือติดต่อห้องเจ้าหน้าที่ฝ่ายการศึกษา ชั้น 3',
    0
  );
}

// Seed Facilities
const facCountList = (db.prepare("SELECT COUNT(*) as count FROM facilities").get() as any).count;
if (facCountList === 0) {
  const insertFacil = db.prepare(`
    INSERT INTO facilities (name, category, description, hours, image, features)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertFacil.run(
    'ศูนย์ฝึกทักษะทางการแพทย์เสมือนจริง (Medical Simulation Center)',
    'ห้องปฏิบัติการทักษะ',
    'พื้นที่ฝึกทักษะหัตถการคลินิกที่ได้มาตรฐาน พร้อมหุ่นจำลองขั้นสูง (High-fidelity Simulators), หุ่นฝึกช่วยฟื้นคืนชีพขั้นสูง (ACLS/NRP), ระบบบันทึกวิดีโอเพื่อการ Debriefing และชุดฝึกตรวจอัลตราซาวด์ POCUS',
    'จันทร์ - ศุกร์ 08:30 - 16:30 น. (ขอเปิดซ้อมนอกเวลาได้ถึง 21:00 น.)',
    '/src/assets/images/medical_simulation_lab_1791177112718.jpg',
    JSON.stringify(['หุ่นจำลองผู้ป่วยภาวะวิกฤต SimMan 3G', 'หุ่นฝึกใส่ท่อช่วยหายใจและเจาะคอ', 'หุ่นฝึกเจาะหลอดเลือดและสายสวนหัวใจ', 'ระบบบันทึกภาพสำหรับ Debriefing Room'])
  );

  insertFacil.run(
    'ห้องสมุดแพทยศาสตร์และคลังสารสนเทศ (Medical Library & Learning Commons)',
    'ห้องสมุดวิชาการ',
    'แหล่งค้นคว้าทางวิชาการแพทย์ รวบรวมตำราเรียนแพทย์ฉบับปรับปรุงล่าสุด วารสารการแพทย์ชั้นนำ บริการสิทธิ์เข้าถึงฐานข้อมูลวิชาการระดับโลก: UpToDate, PubMed, ClinicalKey, CINAHL และห้องศึกษาเดี่ยว/กลุ่ม',
    'เปิดบริการ 24 ชั่วโมงสำหรับนักศึกษาแพทย์ (เข้า-ออกด้วยคีย์การ์ด)',
    '/src/assets/images/medical_library_study_1791177138455.jpg',
    JSON.stringify(['สิทธิ์ใช้งาน UpToDate Anywhere ฟรี', 'คอมพิวเตอร์สืบค้นฐานข้อมูลความเร็วสูง 20 เครื่อง', 'ห้องประชุมกลุ่มย่อย (Small Group Discussion)', 'พื้นที่อ่านหนังสือเงียบสงบ 80 ที่นั่ง'])
  );

  insertFacil.run(
    'ห้องบรรยายและห้องประชุมวิชาการ (Lecture Theatres & Conference Halls)',
    'ห้องเรียนและประชุม',
    'ห้องบรรยายแบบลาดชั้น (Lecture Theatre) พร้อมระบบโสตทัศนูปกรณ์ระดับ 4K ถ่ายทอดสัญญาณสดการผ่าตัด (Live Surgery Broadcast) และรองรับการประชุมทางไกล Teleconference กับมหาวิทยาลัยคู่สัญญา',
    'ตามตารางการเรียนการสอนและการจัดประชุม',
    '/src/assets/images/medical_students_grand_round_1791177126915.jpg',
    JSON.stringify(['ห้องประชุมมงคลนพรัตน์ ความจุ 150 ที่นั่ง', 'ระบบ Hybrid Teleconference Zoom/WebEx', 'กระดานอัจฉริยะ Interactive Smart Screen', 'ระบบถ่ายทอดสดจากห้องผ่าตัดใหญ่ OR'])
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes for Medical Education Center ---

  // Overview Stats
  app.get("/api/mec/stats", (req, res) => {
    const totalStudents = 96; // 3 batches of medical students (Year 4, 5, 6)
    const facultyCount = (db.prepare("SELECT COUNT(*) as count FROM faculty_members").get() as any).count;
    const conferenceCount = (db.prepare("SELECT COUNT(*) as count FROM academic_conferences").get() as any).count;
    const resourceCount = (db.prepare("SELECT COUNT(*) as count FROM educational_resources").get() as any).count;
    const nlPassRate = "98.4%";

    res.json({
      totalStudents,
      facultyCount,
      conferenceCount,
      resourceCount,
      nlPassRate,
      activeRotations: 4
    });
  });

  // Academic Conferences CRUD
  app.get("/api/conferences", (req, res) => {
    const type = req.query.type as string;
    let query = "SELECT * FROM academic_conferences";
    let params: any[] = [];
    if (type && type !== 'all') {
      query += " WHERE type = ?";
      params.push(type);
    }
    query += " ORDER BY date ASC, time ASC";
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  });

  app.post("/api/conferences", (req, res) => {
    const { title, type, department, date, time, speaker, venue, description } = req.body;
    const info = db.prepare(`
      INSERT INTO academic_conferences (title, type, department, date, time, speaker, venue, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, type, department, date, time, speaker, venue, description || '');
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/conferences/:id", (req, res) => {
    db.prepare("DELETE FROM academic_conferences WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Rotation Schedules
  app.get("/api/rotations", (req, res) => {
    const year = req.query.year as string;
    let query = "SELECT * FROM rotation_schedules";
    let params: any[] = [];
    if (year && year !== 'all') {
      query += " WHERE student_year = ?";
      params.push(year);
    }
    query += " ORDER BY id ASC";
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  });

  app.post("/api/rotations", (req, res) => {
    const { student_year, batch_name, department, duration, start_date, end_date, course_director, objectives } = req.body;
    const info = db.prepare(`
      INSERT INTO rotation_schedules (student_year, batch_name, department, duration, start_date, end_date, course_director, objectives)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(student_year, batch_name, department, duration, start_date, end_date, course_director, objectives);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/rotations/:id", (req, res) => {
    db.prepare("DELETE FROM rotation_schedules WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Faculty Members CRUD
  app.get("/api/faculty", (req, res) => {
    const dept = req.query.department as string;
    let query = "SELECT * FROM faculty_members";
    let params: any[] = [];
    if (dept && dept !== 'all') {
      query += " WHERE department = ?";
      params.push(dept);
    }
    query += " ORDER BY id ASC";
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  });

  app.post("/api/faculty", (req, res) => {
    const { name, academic_title, role, department, specialty, image, education, email } = req.body;
    const defaultImg = '/src/assets/images/doctor_portrait_male_1791176624773.jpg';
    const info = db.prepare(`
      INSERT INTO faculty_members (name, academic_title, role, department, specialty, image, education, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, academic_title, role, department, specialty, image || defaultImg, education, email);
    res.json({ id: info.lastInsertRowid });
  });

  app.put("/api/faculty/:id", (req, res) => {
    const { name, academic_title, role, department, specialty, image, education, email } = req.body;
    db.prepare(`
      UPDATE faculty_members 
      SET name = ?, academic_title = ?, role = ?, department = ?, specialty = ?, image = ?, education = ?, email = ?
      WHERE id = ?
    `).run(name, academic_title, role, department, specialty, image, education, email, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/faculty/:id", (req, res) => {
    db.prepare("DELETE FROM faculty_members WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Educational Resources (Download Center)
  app.get("/api/resources", (req, res) => {
    const cat = req.query.category as string;
    let query = "SELECT * FROM educational_resources";
    let params: any[] = [];
    if (cat && cat !== 'all') {
      query += " WHERE category = ?";
      params.push(cat);
    }
    query += " ORDER BY id ASC";
    const rows = db.prepare(query).all(...params);
    res.json(rows);
  });

  app.post("/api/resources", (req, res) => {
    const { title, category, file_type, file_size, description, download_url } = req.body;
    const update_date = new Date().toISOString().split('T')[0];
    const info = db.prepare(`
      INSERT INTO educational_resources (title, category, file_type, file_size, update_date, description, download_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(title, category, file_type || 'PDF', file_size || '1.0 MB', update_date, description, download_url || '#');
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/resources/:id", (req, res) => {
    db.prepare("DELETE FROM educational_resources WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Announcements
  app.get("/api/announcements", (req, res) => {
    const rows = db.prepare("SELECT * FROM announcements ORDER BY is_pinned DESC, date DESC, id DESC").all();
    res.json(rows);
  });

  app.post("/api/announcements", (req, res) => {
    const { title, category, summary, content, is_pinned } = req.body;
    const date = new Date().toISOString().split('T')[0];
    const info = db.prepare(`
      INSERT INTO announcements (title, category, date, summary, content, is_pinned)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, category, date, summary, content, is_pinned ? 1 : 0);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/announcements/:id", (req, res) => {
    db.prepare("DELETE FROM announcements WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Facilities
  app.get("/api/facilities", (req, res) => {
    const rows = db.prepare("SELECT * FROM facilities ORDER BY id ASC").all();
    const formatted = rows.map((r: any) => ({
      ...r,
      features: JSON.parse(r.features || '[]')
    }));
    res.json(formatted);
  });

  // Admin Auth Gate (Simple Passcode for Staff)
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "admin1234" || password === "surin2026" || password === "cpird") {
      res.json({ success: true, token: "mec-auth-" + Date.now() });
    } else {
      res.status(401).json({ success: false, message: "รหัสผ่านไม่ถูกต้อง (รหัสเริ่มต้น: admin1234 หรือ cpird)" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
