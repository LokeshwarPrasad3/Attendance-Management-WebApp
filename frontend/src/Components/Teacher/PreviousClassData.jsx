import React, { useCallback, useEffect, useState } from "react";
import { getSundayNumbers } from "../../Utils/ImpDate";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { host } from "../../API/API";

const PreviousClassData = ({ currentUser }) => {
  // currentUser.teach &&
  //   currentUser.teach.map((cls, index) => {
  //     return (
  //       <React.Fragment key={index}>
  //         <option value={cls.subject}>{cls.subject}</option>
  //       </React.Fragment>
  //     );
  //   });

  // store each subject attendance no detail after post requirest
  const [subjectClassDetails, setSubjectClassDetails] = useState([]);
  //   used to store teacher teach subject/branch/sem details
    const [teacherTeachDetails, setTeacherTeachDetails] = useState([]);

  const getSubjectClassDetails = useCallback(async () => {
    try {
      const finalSubjectDetails = currentUser?.teach?.map((cls) => {
        return { subject: cls.subject, branch: cls.branch, sem: cls.sem };
      });
      setTeacherTeachDetails(finalSubjectDetails);
      console.log("Teacher all subject is ", finalSubjectDetails);

      if (!finalSubjectDetails) {
        //   toast.warn("Subject Details Not found!", { autoClose: 1000 });
        return;
      }

      const token = Cookies.get("_secure_user_");
      console.log("Here", { finalSubjectDetails });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${host}/teacher/get-each-subject-attendance`,
        { subjectArray: finalSubjectDetails },
        config
      );
      console.log("data is ", data);
      const subjectDetailsRes = data?.resForAllSubject;
      console.log("From backend subject wise: ", subjectDetailsRes);

      if (!subjectDetailsRes) {
        toast.warn("Subject Data null", { autoClose: 1000 });
        return;
      }

      setSubjectClassDetails(subjectDetailsRes);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load Subjects Details", { autoClose: 1000 });
    }
    // eslint-disable-next-line
  }, [currentUser?.teach]);

  useEffect(() => {
    getSubjectClassDetails();
  }, [getSubjectClassDetails]);

  return (
    <>
      {/* attendance details of all classess */}
      <div className="each-class-details-container">
        <div className="heading-class-details flex items-center justify-center pt-5  pb-4">
          <h2 className="text-xl font-semibold">
            Total Days of Classess :&nbsp;
          </h2>
          <span className="text-xl font-bold">
            {" "}
            {getSundayNumbers().totalClassDays}
          </span>
        </div>
        <div className="each-class-details flex items-center flex-wrap gap-4 justify-center">
          {subjectClassDetails &&
            subjectClassDetails?.map((subjectDetail, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="each-class bg-white p-3 min-w-[20rem]">
                    <div className="subject-name">
                      <h3 className="text-lg font-overpass">
                        Subject : <b> {subjectDetail?.subject}</b>
                      </h3>
                    </div>
                    <div className="done-class">
                      <h3 className="text-lg font-overpass">
                        {/* user can search by subjects */}
                        Class Done :
                        <b>
                          {subjectDetail?.totalClassess}/
                          {getSundayNumbers().totalClassDays}
                        </b>
                      </h3>
                    </div>
                    <div className="percent-class">
                      <h3 className="text-lg font-overpass">
                        {" "}
                        Percentage :{" "}
                        <b>
                          {Math.floor(
                            (subjectDetail?.totalClassess /
                              getSundayNumbers()?.totalClassDays) *
                              100
                          )}
                          %
                        </b>
                      </h3>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PreviousClassData;
