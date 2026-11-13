import "./style.css";
import coefficients from "./coefficients.json";
import { ValidationError, calculatePrice, formatKRW, type InfluencerInput } from "./calculator";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

function fillSelect(id: string, options: Record<string, { label: string }>) {
  const select = $<HTMLSelectElement>(id);
  for (const [value, { label }] of Object.entries(options)) {
    select.add(new Option(label, value));
  }
}

fillSelect("platform", coefficients.platform);
fillSelect("category", coefficients.category);
fillSelect("contentType", coefficients.contentType);
$("build-info").textContent = `${import.meta.env.VITE_BUILD_SHA ?? "local"} · 계수 ${coefficients.version}`;

$<HTMLFormElement>("calc-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget as HTMLFormElement);
  const input: InfluencerInput = {
    platform: data.get("platform") as InfluencerInput["platform"],
    followerCount: Number(data.get("followerCount")),
    avgLikes: Number(data.get("avgLikes")),
    avgComments: Number(data.get("avgComments")),
    category: data.get("category") as InfluencerInput["category"],
    contentType: data.get("contentType") as InfluencerInput["contentType"],
  };

  const error = $("error");
  const result = $("result");
  try {
    const r = calculatePrice(input);
    error.hidden = true;
    $("min").textContent = formatKRW(r.minPrice);
    $("max").textContent = formatKRW(r.maxPrice);
    $("breakdown").replaceChildren(
      ...r.breakdown.map((step) => {
        const tr = document.createElement("tr");
        for (const text of [step.label, `× ${step.multiplier}`, formatKRW(step.amount)]) {
          const td = document.createElement("td");
          td.textContent = text;
          tr.append(td);
        }
        return tr;
      }),
    );
    result.hidden = false;
  } catch (e) {
    if (!(e instanceof ValidationError)) throw e;
    error.textContent = e.message;
    error.hidden = false;
    result.hidden = true;
  }
});
