import "bootstrap/dist/css/bootstrap.min.css";
import "./Resume.css";
import { useEffect, useState } from "react";
import { request } from "../../request/index";
import { format } from "date-fns";

interface Category {
  _id: string;
  workName: string;
  companyName: string;
  startDate: string;
  description: string;
  endDate: string;
  level: string;
  name: string;
}

const Resume = () => {
  // const [experience, setExperience] = useState<Category[]>([]);
  // const [education, setEducation] = useState<Category[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let { data } = await request.get(
  //         "experiences?user[in]=64395a65ea542e4adcff0f06"
  //       );
  //       let categordata = data.data;
  //       // console.log(categordata);
  //       setExperience(categordata);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   const fetchDatas = async () => {
  //     try {
  //       let { data } = await request.get(
  //         "education?user=64dddfabdccb1b00143b2e85"
  //       );
  //       let categordatas = data.data;
  //       // console.log(categordata);
  //       setEducation(categordatas);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  //   fetchDatas();
  // }, []);
  // console.log(experience);

  const [experience, setExperience] = useState<Category[]>([]);
  const [education, setEducation] = useState<Category[]>([]);

  const fetchData = async (
    endpoint: string,
    setter: (data: Category[]) => void
  ) => {
    try {
      const { data } = await request.get(endpoint);
      const categoryData = data.data;
      setter(categoryData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("experiences?limit=4", setExperience);
    fetchData("education?limit=3", setEducation);
  }, []);

  // console.log(experience);
  // console.log(education);

  return (
    <section id="resume" className="resume section-show">
      <div className="container">
        <div className="section-title">
          <h2>Resume</h2>
          <p>Check My Resume</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">Sumary</h3>
            <div className="resume-item pb-0">
              <h4>Alice Barkley</h4>
              <p>
                <em>
                  Innovative and deadline-driven Graphic Designer with 3+ years
                  of experience designing and developing user-centered
                  digital/print marketing material from initial concept to
                  final, polished deliverable.
                </em>
              </p>
              <p></p>
              <ul>
                <li>Portland par 127,Orlando, FL</li>
                <li>(123) 456-7891</li>
                <li>alice.barkley@example.com</li>
              </ul>
              <p></p>
            </div>

            <h3 className="resume-title">Education</h3>
            {education?.map((pr) => (
              <div key={pr._id} className="resume-item">
                <h4>{pr.level}</h4>
                <h5>
                  {format(new Date(pr.startDate), "MMM d , yyyy")} -{" "}
                  {format(new Date(pr.endDate), "MMM d , yyyy")}
                </h5>
                <p>
                  <em>{pr.name}</em>
                </p>
                <p>{pr.description}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <h3 className="resume-title">Professional Experience</h3>
            {experience?.map((pr) => (
              <div key={pr._id} className="resume-item">
                <h4>{pr.workName} specialist</h4>
                <h5>
                  {" "}
                  {format(new Date(pr.startDate), "MMM d , yyyy")} - Start
                </h5>
                {"-"}
                <h5>{format(new Date(pr.endDate), "MMM d , yyyy")} - End</h5>
                <p>
                  <em>{pr.companyName} </em>
                </p>
                <p></p>
                <ul>
                  <li>{pr.description}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
