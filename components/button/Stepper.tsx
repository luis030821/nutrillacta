import useCss from "@/hooks/useCss";
import React, { useState, useEffect } from "react";
export declare type StepperProps = {
  children: React.ReactElement | React.ReactElement[];
  showProgressBar?: boolean;
  defaultActiveStep?: number;
  backBtn?: React.ReactNode;
  continueBtn?: React.ReactNode;
  submitBtn?: React.ReactNode;
  onContinue?: (step: number) => void;
  onPrev?: (step: number) => void;
  onSubmit?: (step: number) => void;
  btnPos?:
    | "center"
    | "end"
    | "flex-end"
    | "flex-start"
    | "inherit"
    | "initial"
    | "left"
    | "normal"
    | "revert"
    | "right"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "start"
    | "stretch"
    | "unset";
  barWidth?: string;
  strokeColor?: string;
  fillStroke?: string;
  stroke?: number;
  activeColor?: string;
  activeProgressBorder?: string;
  progressBarClassName?: string;
  contentBoxClassName?: string;
  allowClickControl?: boolean;
};

const Stepper = (props: StepperProps) => {
  useCss(`.stepperDiv {
  z-index: 3;
}

.stepperDiv .progressBarDiv {
  display: flex;
  justify-content: center;
  align-items: center;
}
.stepperDiv .progressBarContainer {
  position: relative;
  width: 100%;
}
.stepperDiv .steps {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 9;
}
.stepperDiv .step {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 1s;
}
.stepperDiv .step.selected {
  border: 2px solid #3a4047;
}
.stepperDiv .step.completed {
  border: 2px solid #f3f4f5;
  background: #3a4047;
}
.stepperDiv .progress {
  position: absolute;
  width: 100%;
  height: 50%;
  z-index: 3;
  transition: background 1s;
}
.stepperDiv .percent {
  position: absolute;
  width: 0;
  height: 100%;
  z-index: -1;
  transition: width 1s;
}
.stepperDiv .defaultBtn {
  background: #3a4047;
  color: #f3f4f5;
  cursor: pointer;
  outline: 0;
  box-shadow: none;
  padding: 0.4em 1em;
  border: none;
  border-radius: 45px;
}
`);
  const {
    children = [],
    showProgressBar = true,
    defaultActiveStep = 1,
    backBtn,
    continueBtn,
    submitBtn,
    onContinue = () => {},
    onPrev = () => {},
    onSubmit = () => {},
    btnPos = "space-between",
    barWidth = "",
    strokeColor = "#cdd3d8",
    fillStroke = "#3a4047",
    stroke = 2,
    activeColor = "#3A4047",
    activeProgressBorder = "2px solid #f3f4f5",
    progressBarClassName = "",
    contentBoxClassName = "",
    allowClickControl = true,
  } = props;

  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    if (
      defaultActiveStep <= (children as React.ReactElement[]).length &&
      defaultActiveStep > 0
    ) {
      progress(defaultActiveStep - 1);
      setActive(defaultActiveStep);
    } else {
      progress(0);
      setActive(1);
    }
  }, []);

  useEffect(() => {
    if ((children as React.ReactElement[]).length > 1 && showProgressBar) {
      //Progress Circle Border & Background Color
      (children as React.ReactElement[]).map((_child, ind) => {
        const element = document.getElementById(
          `input_${ind}`
        ) as HTMLInputElement;
        if (element.classList.length > 1) {
          element.style.background = activeColor;
          element.style.border = activeProgressBorder;
        } else {
          element.style.background = "#fff";
          element.style.border = "2px solid #3A4047";
        }
      });
    }
  }, [active]);

  const previousStep = () => {
    if (!active || active <= 1) {
      return;
    }
    progress(active - 2);
    const newActive = active - 1;
    setActive(newActive);
    onPrev(newActive);
  };

  const nextStep = () => {
    if (!active || active >= (children as React.ReactElement[]).length) {
      return;
    }
    progress(active);
    const newActive = active + 1;
    setActive(newActive);
    onContinue(newActive);
  };

  const progressClick = (ind: number) => {
    if (!allowClickControl) return;
    setActive(ind + 1);
    progress(ind);
  };

  const progress = (stepNum: number) => {
    if ((children as React.ReactElement[]).length > 1 && showProgressBar) {
      let p = (stepNum / ((children as React.ReactElement[]).length - 1)) * 100;
      (
        document.getElementsByClassName("percent")[0] as HTMLElement
      ).style.width = `${p}%`;
    }

    if ((children as React.ReactElement[]).length > 1 && showProgressBar) {
      for (
        let index = 0;
        index < (children as React.ReactElement[]).length;
        index++
      ) {
        const e = document.getElementById(`input_${index}`)!;
        const eInd = parseInt(e?.id?.split("_")[1]);
        if (eInd === stepNum) {
          e.classList.add("selected");
          e.classList.remove("completed");
        }
        if (eInd <= stepNum) {
          e.classList.add("completed");
        }
        if (eInd > stepNum) {
          e.classList.remove("selected", "completed");
        }
      }
    }
  };

  return (
    <div className={"stepperDiv"}>
      {(children as React.ReactElement[]).length > 1 && showProgressBar && (
        <div className={`${"progressBarDiv"} ${progressBarClassName}`}>
          <div className={"progressBarContainer"} style={{ width: barWidth }}>
            <div
              className={"progress"}
              style={{ borderBottom: `${stroke}px solid ${strokeColor}` }}
            >
              <div
                className={"percent"}
                style={{ borderBottom: `${stroke}px solid ${fillStroke}` }}
              ></div>
            </div>
            <div className={"steps"}>
              {(children as React.ReactElement[]).map((_child, ind) => {
                return (
                  <div
                    key={ind}
                    className={"step"}
                    id={`input_${ind}`}
                    onClick={() => progressClick(ind)}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className={contentBoxClassName}>
        {(children as React.ReactElement[]).length > 1
          ? (children as React.ReactElement[]).map((child, index) => {
              return active === index + 1 && child;
            })
          : children}

        <div
          style={{
            display: "flex",
            justifyContent: btnPos,
            marginTop: "20px",
          }}
        >
          {active > 1 ? (
            backBtn ? (
              <span onClick={previousStep} style={{ marginRight: "20px" }}>
                {backBtn}
              </span>
            ) : (
              <button
                className={"defaultBtn"}
                onClick={previousStep}
                style={{ marginRight: "20px" }}
              >
                Go Back
              </button>
            )
          ) : (
            <span></span>
          )}
          {active < (children as React.ReactElement[]).length ? (
            continueBtn ? (
              <span onClick={() => nextStep()}>{continueBtn}</span>
            ) : (
              <button className={"defaultBtn"} onClick={() => nextStep()}>
                Continue
              </button>
            )
          ) : submitBtn ? (
            <span onClick={() => onSubmit(active)}>{submitBtn}</span>
          ) : (
            <button className={"defaultBtn"} onClick={() => onSubmit(active)}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
