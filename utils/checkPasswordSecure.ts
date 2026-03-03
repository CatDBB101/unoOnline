export type PasswordScore = Record<
    "length" | "hasNum" | "hasUpper" | "hasLower" | "isSecure",
    boolean
>;

export const passwordSecureRuleLabel = {
    length: "length more than or equal 12",
    hasNum: "has number",
    hasUpper: "has uppercase alphabet",
    hasLower: "has lowercase alphabet",
};

export default function checkPasswordSecure(pw: string): PasswordScore {
    const res = {
        length: pw.length >= 12,
        hasNum: /\d/.test(pw),
        hasUpper: /[A-Z]/.test(pw),
        hasLower: /[a-z]/.test(pw),
    };
    return { ...res, isSecure: Object.values(res).every(Boolean) };
}
