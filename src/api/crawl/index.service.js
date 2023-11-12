import axios from "axios";
import cheerio from "cheerio";

const parsing = async (page) => {
  const res = []
  const $ = cheerio.load(page.data);
  const $jobList = $(".post");
  $jobList.each((idx, node) => {
    const jobTitle = $(node).find(".title:eq(0)").text().trim();
    const company = $(node).find(".name:eq(0)").text().trim();
    const experience = $(node).find(".exp:eq(0)").text().trim();
    const education = $(node).find(".exp:eq(0)").text().trim();
    const regularYN = $(node).find(".option>span:eq(2)").text().trim();
    const region = $(node).find(".long:eq(0)").text().trim();
    const dueDate = $(node).find(".date:eq(0)").text().trim();
    const etc = $(node).find(".etc:eq(0)").text().trim();

    res.push({
      jobTitle,
      company,
      experience,
      education,
      regularYN,
      region,
      dueDate,
      etc,
    });
  });

  return res;
};

export const getJobs = async (ctx) => {
  try {
    const { keyword } = ctx.request.query;
    const html = await axios.get(`https://www.jobkorea.co.kr/Search/?stext=${keyword}`)
    const data = await parsing(html)
    ctx.body = data
  } catch(err) {
    ctx.throw(500, err);
  }
}