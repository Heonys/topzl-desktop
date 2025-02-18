import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import DarkTheme from "@/assets/images/dark.png";
import LightTheme from "@/assets/images/light.png";
import StaticIcon from "@/icons/StaticIcon";
import { SelectBoxItem } from "@/components/setting/common";

const themes = [
  { title: "Light", image: LightTheme },
  { title: "Dark", image: DarkTheme },
];

const languages = ["Korean", "English"];

const closeActions = [
  {
    value: "exit",
    title: "어플리케이션 종료",
  },
  {
    value: "minimize",
    title: "트레이로 이동",
  },
];

const permission = [
  { value: "granted", title: "사용" },
  { value: "denied", title: "사용 안 함" },
];

const maximumHistory = [{ title: 7 }, { title: 10 }, { title: 15 }];

const General = () => {
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [selectedAction, setselectedAction] = useState(closeActions[0]);
  const [selectedPermition, setSelectedPermition] = useState(permission[0]);
  const [selectedHistory, setSelectedHistory] = useState(maximumHistory[0]);

  return (
    <div className="flex w-full flex-col gap-4 py-5 pt-4">
      {/* Language */}
      <SelectBoxItem
        keyPath="general.language"
        label="언어 설정"
        description="어플리케이션의 기본 언어를 설정 합니다."
        iconName="language"
        options={languages}
        value={selectedLang}
        width="200px"
        onChange={(lang) => {
          setSelectedLang(lang);
        }}
      />

      {/* Audio Output Device  */}
      {/* <div className="my-1 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StaticIcon iconName="headset" size={17} />
            <div className="text-sm font-bold text-black">오디오 출력 장치</div>
          </div>
          <div className="text-sm text-black/50">기본 오디오 출력 장치를 선택합니다.</div>
        </div>
        <div className="w-80 rounded-lg text-black">
          <Listbox value={selectedLang} onChange={setSelectedLang}>
            <ListboxButton
              className={twMerge(
                "relative block w-full rounded-lg py-1.5 pl-3 pr-8 text-left text-sm/6 border-black/20 border",
              )}
            >
              <div className="font-sans text-sm font-semibold">{`Default - 헤드폰(WH-1000XM5)`}</div>
              <StaticIcon
                iconName="chevron-down"
                className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-black"
              />
            </ListboxButton>
          </Listbox>
        </div>
      </div> */}

      {/* Theme */}
      <div className="my-1 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StaticIcon iconName="sparkles" size={17} />
            <div className="text-sm font-bold text-black">테마 설정</div>
          </div>
          <div className="text-sm text-black/50">어플리케이션의 테마를 선택합니다.</div>
        </div>
        <RadioGroup value={selectedTheme} onChange={setSelectedTheme} className="mt-2 flex gap-2">
          {themes.map(({ title, image }) => {
            const isSelected = selectedTheme === title;
            return (
              <Field
                key={title}
                className={twMerge(
                  "box-border border-2 border-transparent rounded-xl",
                  isSelected ? "border-blue-300" : "",
                )}
              >
                <Label className="cursor-pointer">
                  <div className="flex flex-col items-center rounded-xl shadow-xl">
                    <img
                      className="w-36 rounded-t-xl object-cover"
                      src={image}
                      alt="light"
                      draggable={false}
                    />
                    <div className="flex items-center gap-2 p-1.5">
                      <Radio
                        value={title}
                        className={twMerge(
                          "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                          "data-[checked]:bg-blue-400 data-[checked]:border-white",
                        )}
                      >
                        <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                      </Radio>
                      <div className="text-xs">{title}</div>
                    </div>
                  </div>
                </Label>
              </Field>
            );
          })}
        </RadioGroup>
      </div>

      {/* When close button */}
      <div className="my-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StaticIcon iconName="box-close" size={17} />
            <div className="text-sm font-bold text-black">종료 버튼 클릭시</div>
          </div>
          <div className="text-sm text-black/50">종료 버튼 클릭시 동작을 선택 합니다.</div>
        </div>

        <RadioGroup value={selectedAction} onChange={setselectedAction} className="flex gap-2">
          {closeActions.map((action) => {
            return (
              <Field key={action.title} className="flex items-center gap-2">
                <Radio
                  value={action}
                  className={twMerge(
                    "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                    "data-[checked]:bg-blue-400 data-[checked]:border-white",
                  )}
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label className="text-sm font-medium">{action.title}</Label>
              </Field>
            );
          })}
        </RadioGroup>
      </div>

      {/* Notification */}
      <div className="my-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StaticIcon iconName="notification" size={17} />
            <div className="text-sm font-bold text-black">데스크톱 알림 사용여부</div>
          </div>
          <div className="text-sm text-black/50">
            어플리케이션에서 데스크톱 알림을 표시하도록 설정합니다.
          </div>
        </div>

        <RadioGroup
          value={selectedPermition}
          onChange={setSelectedPermition}
          className="flex gap-2"
        >
          {permission.map((action) => {
            return (
              <Field key={action.title} className="flex items-center gap-2">
                <Radio
                  value={action}
                  className={twMerge(
                    "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                    "data-[checked]:bg-blue-400 data-[checked]:border-white",
                  )}
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label className="text-sm font-medium">{action.title}</Label>
              </Field>
            );
          })}
        </RadioGroup>
      </div>

      {/* Maximum search history */}
      <div className="my-2 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <StaticIcon iconName="history" size={17} />
            <div className="text-sm font-bold text-black">최대 검색 기록 항목</div>
          </div>
          <div className="text-sm text-black/50">검색 기록에 대한 최대 항목 수를 지정하세요.</div>
        </div>

        <RadioGroup value={selectedHistory} onChange={setSelectedHistory} className="flex gap-3">
          {maximumHistory.map((history) => {
            return (
              <Field key={history.title} className="flex items-center gap-2">
                <Radio
                  value={history}
                  className={twMerge(
                    "group flex size-4 items-center border-black/20 justify-center rounded-full border bg-white",
                    "data-[checked]:bg-blue-400 data-[checked]:border-white",
                  )}
                >
                  <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                </Radio>
                <Label className="text-sm font-medium">{history.title}</Label>
              </Field>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
export default General;
