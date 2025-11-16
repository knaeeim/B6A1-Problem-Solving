### প্রশ্ন ১: TypeScript-এ Interface এবং Type-এর মধ্যে পার্থক্য কী?

TypeScript-এ `interface` এবং `type` উভয়ই টাইপ/স্ট্রাকচার নির্ধারণ করতে ব্যবহার হয়। প্রধান পার্থক্যসমূহ:

- Interface
  - ডিক্লারেশন মার্জিং (Declaration merging) সমর্থন করে — একই নামে একাধিক ডিফাইন করলে মিলে যায়।
  - মূলত অবজেক্টের স্ট্রাকচার বর্ণনার জন্য ব্যবহৃত হয় এবং ক্লাসে `implements` করা যায়।
  - একাধিক ইন্টারফেসকে `extends` করে সম্প্রসারিত করা যায়।

- Type (টাইপ এলিয়াস)
  - declaration merging সমর্থন করে না।
  - প্রিমিটিভ, ইউনিয়ন, ইন্টারসেকশন, টাপল সহ বহুমুখী (versatile)।
  - `|` (union) এবং `&` (intersection) দিয়ে টাইপ কম্বাইন করা সহজ।

উদাহরণ:

```typescript
// Interface উদাহরণ
interface User {
  name: string;
  id: number;
}

// একই নামে আরও একটি ইন্টারফেস (Declaration Merging)
interface User {
  jobTitle?: string;
}

const user: User = {
  name: "Rahim",
  id: 101,
  jobTitle: "Developer"
};

class Admin implements User {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

// Type উদাহরণ
type Point = { x: number; y: number };
type Status = "pending" | "approved" | "rejected";
type UserID = string | number;

const id: UserID = "abc-123";
const currentStatus: Status = "pending";
```

কখন কোনটি ব্যবহার করবেন?
- Interface ব্যবহার করুন: যখন অবজেক্ট স্ট্রাকচার (বিশেষ করে OOP-এ ক্লাস) বর্ণনা করতে চান বা declaration merging দরকার।
- Type ব্যবহার করুন: যখন ইউনিয়ন/ইন্টারসেকশন, প্রিমিটিভ এলিয়াস বা টাপল ডিফাইন করতে চান।

---

### প্রশ্ন ২: any, unknown, এবং never টাইপের মধ্যে পার্থক্য কী?

সংক্ষিপ্তভাবে:
- any: টাইপ-চেক এড়ানোর জন্য; টাইপ-নিরাপত্তা নেই।
- unknown: any-এর নিরাপদ বিকল্প; অ্যাসাইন করা যায় কিন্তু ব্যবহার করার আগে টাইপ চেক করতে হবে।
- never: এমন মানকে প্রকাশ করে যা কখনোই ঘটবে না (যেমন ফাংশন যা কখনো রিটার্ন করে না)।

বিস্তারিত:

1. any
- কী: TypeScript-এর "escape hatch" — কোনো টাইপ চেক নেই।
- আচরণ: যেকোনো ভ্যালু অ্যাসাইন ও যেকোনো অপারেশন করা যায়; কম্পাইল টাইমে ত্রুটি পাওয়া যাবে না।
- ঝুঁকি: রানটাইম এ্যারর ঘটাতে পারে; সাধারণত সীমিত বা বিশেষ ক্ষেত্রে ব্যবহার করা উচিত।

```typescript
let data: any = "Hello";
data = 10;
data = true;
console.log(data.toUpperCase()); // কম্পাইল টাইমে ত্রুটি নেই, রানটাইমে সমস্যা হতে পারে
```

2. unknown
- কী: any-এর টাইপ-নিরাপদ বিকল্প।
- আচরণ: যেকোনো ভ্যালু অ্যাসাইন করা যায়, কিন্তু ব্যবহার করার আগে টাইপ ন্যারো করতে হবে (typeof, instanceof, কাস্ট বা কাস্টোম টাইপ গার্ড)।
- সুবিধা: টাইপ-নিরাপত্তা বজায় রেখে অজানা ইনপুট হ্যান্ডেল করা যায়।

```typescript
let value: unknown = "Hello TypeScript";
// value.toUpperCase(); // এরর: 'value' is of type 'unknown'

if (typeof value === "string") {
  console.log(value.toUpperCase()); // এখন ঠিক আছে
}
```

3. never
- কী: এমন টাইপ যা কখনোই মান ধারণ করে না — ফাংশন যা কখনো রিটার্ন করে না বা সবসময় এরর ছুঁড়ে।
- আচরণ: never টাইপের ভেরিয়েবলে কোনো মান দেওয়া যায় না।
- ব্যবহার: unreachable code, সর্বদা এরর থ্রো করা ফাংশন, বা অসীম লুপ।

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // never returns
  }
}
```

সারাংশ টেবিল:

| বৈশিষ্ট্য                                | any   | unknown | never        |
|------------------------------------------|:-----:|:-------:|:------------:|
| টাইপ-নিরাপদ?                             | না    | হ্যাঁ   | প্রযোজ্য নয় |
| যেকোনো ভ্যালু অ্যাসাইন করা যায়?           | হ্যাঁ | হ্যাঁ   | না           |
| সরাসরি ব্যবহার করা যায়?                  | হ্যাঁ (অনিরাপদ) | না (প্রথমে চেক করতে হয়) | না (মান নেই) |
| মূল ব্যবহার                              | টাইপ-চেক এড়ানো | অজানা টাইপ নিরাপদে হ্যান্ডেল করা | ফাংশন/কোড যা কখনো ফিরতে/ঘটতে পারে না |