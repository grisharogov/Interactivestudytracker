import React, { useState, useEffect } from 'react';
import { BookOpen, CheckSquare, Video, ClipboardCheck, Edit2, Save, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { Checkbox } from './components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

const activitiesData = [
  { subject: 'Property', activities: 15, hours: '30 h' },
  { subject: 'Will', activities: 10, hours: '20 h' },
  { subject: 'Land', activities: 6, hours: '12 h' },
  { subject: 'Trust', activities: 5, hours: '10 h' },
  { subject: 'Conduct', activities: 4, hours: '8 h' },
  { subject: 'Criminal Practice', activities: 13, hours: '26 h' },
  { subject: 'Criminal Liability', activities: 5, hours: '10 h' },
];

const videosData = [
  { subject: 'Property', hours: '3 h', videos: 3, dates: '27 Oct · 1 Dec · 2 Dec' },
  { subject: 'Will', hours: '4 h', videos: 4, dates: '3 Nov · 1 Dec · 5 Dec · 10 Dec' },
  { subject: 'Land', hours: '2 h', videos: 2, dates: '17 Nov · 24 Nov' },
  { subject: 'Trust', hours: '2 h', videos: 2, dates: '24 Nov · 26 Nov' },
  { subject: 'Conduct', hours: '2 h', videos: 2, dates: '9 Dec · 15 Dec' },
  { subject: 'Criminal Practice + Liability', hours: '5 h', videos: 5, dates: '8 Dec · 15 Dec · 21 Dec · 22 Dec · 28 Dec' },
];

const testsData = [
  { testNum: '1', duration: '0 h 30 m', studyTime: '1 h', placement: '25 Oct (Week 1)', label: 'Test 1' },
  { testNum: '2', duration: '0 h 45 m', studyTime: '1.5 h', placement: '31 Oct (Week 2)', label: 'Test 2' },
  { testNum: '3', duration: '1 h 15 m', studyTime: '2.5 h', placement: '6 Nov (Week 3)', label: 'Test 3' },
  { testNum: '4', duration: '2 h', studyTime: '4 h', placement: '23 Nov (Week 5)', label: 'Test 4' },
  { testNum: '5', duration: '2 h 30 m', studyTime: '5 h', placement: '4 Dec (Week 7)', label: 'Test 5' },
  { testNum: '6', duration: '2 h 30 m', studyTime: '5 h', placement: '27 Dec (Week 10)', label: 'Test 6' },
  { testNum: '7', duration: '2 h 30 m', studyTime: '5 h', placement: '30 Dec (Week 11)', label: 'Test 7' },
  { testNum: '8', duration: '2 h', studyTime: '3 h', placement: '–', label: 'Test 8 (85 questions)' },
];

const studyPlanData = [
  {
    week: '1',
    dates: '20–26 Oct',
    focus: 'Property · Will · Land intro',
    mon: '–',
    tue: '13',
    wed: '13',
    thu: '13',
    fri: '13 + Test #1 (0:30 → 1 h)',
    sat: '14',
    sun: '13',
    pagesPerWeek: '79',
  },
  {
    week: '2',
    dates: '27 Oct–2 Nov',
    focus: 'Continue Property · Will · Trust start',
    mon: '11',
    tue: '11',
    wed: '11',
    thu: '11 + Test #2 (0:45 → 1.5 h)',
    fri: '11',
    sat: '11',
    sun: '11',
    pagesPerWeek: '77',
  },
  {
    week: '3',
    dates: '3–9 Nov',
    focus: 'Half-load (Property · Will)',
    mon: '6',
    tue: '5',
    wed: 'Test #3 (1:15 → 2.5 h)',
    thu: '4',
    fri: '4',
    sat: '4',
    sun: '4',
    pagesPerWeek: '27',
  },
  {
    week: '4',
    dates: '10–16 Nov',
    focus: 'Land · Trust emphasis',
    mon: '4',
    tue: '4',
    wed: '4',
    thu: '13',
    fri: '13',
    sat: '12',
    sun: '11',
    pagesPerWeek: '61',
  },
  {
    week: '5',
    dates: '17–23 Nov',
    focus: 'Finish Land & Trust · continue Property',
    mon: '10',
    tue: '8',
    wed: '8',
    thu: '8',
    fri: '8',
    sat: 'Test #4 (2 h → 4 h)',
    sun: '5',
    pagesPerWeek: '47',
  },
  {
    week: '6',
    dates: '24–30 Nov',
    focus: 'Finish Property & Will (Phase 1 ends)',
    mon: '9',
    tue: '9',
    wed: '9',
    thu: '9',
    fri: '9',
    sat: '7',
    sun: '7',
    pagesPerWeek: '59',
  },
  {
    week: '7',
    dates: '1–7 Dec',
    focus: 'Start Conduct · Crim.Prac · Liability',
    mon: '10',
    tue: '10',
    wed: 'Test #5 (2:30 → 5 h)',
    thu: '10',
    fri: '10',
    sat: '7',
    sun: '6',
    pagesPerWeek: '53',
  },
  {
    week: '8',
    dates: '8–14 Dec',
    focus: 'Conduct + Criminal focus',
    mon: '8',
    tue: '8',
    wed: '8',
    thu: '8',
    fri: '8',
    sat: '8',
    sun: '7',
    pagesPerWeek: '55',
  },
  {
    week: '9',
    dates: '15–21 Dec',
    focus: 'Criminal deep dive',
    mon: '8',
    tue: '8',
    wed: '8',
    thu: '8',
    fri: '8',
    sat: '8',
    sun: '7',
    pagesPerWeek: '55',
  },
  {
    week: '10',
    dates: '22–28 Dec (22–23 off)',
    focus: 'Finish Conduct + Criminal',
    mon: '–',
    tue: '–',
    wed: '2',
    thu: '2',
    fri: 'Test #6 (2:30 → 5 h)',
    sat: '2',
    sun: '2',
    pagesPerWeek: '8',
  },
  {
    week: '11',
    dates: '29 Dec',
    focus: 'Final day · tests',
    mon: 'Test #7 (2:30 → 5 h)',
    tue: '–',
    wed: '–',
    thu: '–',
    fri: '–',
    sat: '–',
    sun: '–',
    pagesPerWeek: '0',
  },
];

export default function App() {
  // Load initial state from localStorage or use empty objects
  const [checkedCells, setCheckedCells] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sqe1-checkedCells');
    return saved ? JSON.parse(saved) : {};
  });
  const [checkedActivities, setCheckedActivities] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sqe1-checkedActivities');
    return saved ? JSON.parse(saved) : {};
  });
  const [checkedVideos, setCheckedVideos] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sqe1-checkedVideos');
    return saved ? JSON.parse(saved) : {};
  });
  const [checkedTests, setCheckedTests] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('sqe1-checkedTests');
    return saved ? JSON.parse(saved) : {};
  });
  const [actualPages, setActualPages] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('sqe1-actualPages');
    return saved ? JSON.parse(saved) : {};
  });
  const [editingCell, setEditingCell] = useState<string | null>(null);

  // Edit mode states for each table
  const [isEditingStudyPlan, setIsEditingStudyPlan] = useState(false);
  const [isEditingActivities, setIsEditingActivities] = useState(false);
  const [isEditingVideos, setIsEditingVideos] = useState(false);
  const [isEditingTests, setIsEditingTests] = useState(false);

  // Temporary states for editing (to support cancel)
  const [tempCheckedCells, setTempCheckedCells] = useState<Record<string, boolean>>({});
  const [tempCheckedActivities, setTempCheckedActivities] = useState<Record<string, boolean>>({});
  const [tempCheckedVideos, setTempCheckedVideos] = useState<Record<string, boolean>>({});
  const [tempCheckedTests, setTempCheckedTests] = useState<Record<string, boolean>>({});
  const [tempActualPages, setTempActualPages] = useState<Record<string, number>>({});

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sqe1-checkedCells', JSON.stringify(checkedCells));
  }, [checkedCells]);

  useEffect(() => {
    localStorage.setItem('sqe1-checkedActivities', JSON.stringify(checkedActivities));
  }, [checkedActivities]);

  useEffect(() => {
    localStorage.setItem('sqe1-checkedVideos', JSON.stringify(checkedVideos));
  }, [checkedVideos]);

  useEffect(() => {
    localStorage.setItem('sqe1-checkedTests', JSON.stringify(checkedTests));
  }, [checkedTests]);

  useEffect(() => {
    localStorage.setItem('sqe1-actualPages', JSON.stringify(actualPages));
  }, [actualPages]);

  // Edit mode handlers
  const startEditingStudyPlan = () => {
    setTempCheckedCells({ ...checkedCells });
    setTempActualPages({ ...actualPages });
    setIsEditingStudyPlan(true);
  };

  const saveStudyPlan = () => {
    setCheckedCells({ ...tempCheckedCells });
    setActualPages({ ...tempActualPages });
    setIsEditingStudyPlan(false);
  };

  const cancelStudyPlan = () => {
    setIsEditingStudyPlan(false);
  };

  const startEditingActivities = () => {
    setTempCheckedActivities({ ...checkedActivities });
    setIsEditingActivities(true);
  };

  const saveActivities = () => {
    setCheckedActivities({ ...tempCheckedActivities });
    setIsEditingActivities(false);
  };

  const cancelActivities = () => {
    setIsEditingActivities(false);
  };

  const startEditingVideos = () => {
    setTempCheckedVideos({ ...checkedVideos });
    setIsEditingVideos(true);
  };

  const saveVideos = () => {
    setCheckedVideos({ ...tempCheckedVideos });
    setIsEditingVideos(false);
  };

  const cancelVideos = () => {
    setIsEditingVideos(false);
  };

  const startEditingTests = () => {
    setTempCheckedTests({ ...checkedTests });
    setIsEditingTests(true);
  };

  const saveTests = () => {
    setCheckedTests({ ...tempCheckedTests });
    setIsEditingTests(false);
  };

  const cancelTests = () => {
    setIsEditingTests(false);
  };

  const handleCheckChange = (weekIndex: number, day: string, checked: boolean) => {
    const key = `${weekIndex}-${day}`;
    if (isEditingStudyPlan) {
      setTempCheckedCells((prev) => ({
        ...prev,
        [key]: checked,
      }));
    }
  };

  const handleActivityCheckChange = (subject: string, activityNum: number, checked: boolean) => {
    const key = `${subject}-${activityNum}`;
    if (isEditingActivities) {
      setTempCheckedActivities((prev) => ({
        ...prev,
        [key]: checked,
      }));
    }
  };

  const handleVideoCheckChange = (subject: string, videoNum: number, checked: boolean) => {
    const key = `${subject}-${videoNum}`;
    if (isEditingVideos) {
      setTempCheckedVideos((prev) => ({
        ...prev,
        [key]: checked,
      }));
    }
  };

  const handleTestCheckChange = (testNum: string, checked: boolean) => {
    if (isEditingTests) {
      setTempCheckedTests((prev) => ({
        ...prev,
        [testNum]: checked,
      }));
    }
  };

  const handlePageInput = (weekIndex: number, day: string, value: string) => {
    const key = `${weekIndex}-${day}`;
    const numValue = parseInt(value);
    
    if (isEditingStudyPlan) {
      if (!isNaN(numValue) && numValue >= 0) {
        setTempActualPages((prev) => ({
          ...prev,
          [key]: numValue,
        }));
      } else if (value === '') {
        // Remove the actual value if input is cleared
        setTempActualPages((prev) => {
          const newState = { ...prev };
          delete newState[key];
          return newState;
        });
      }
    }
    setEditingCell(null);
  };

  const getActualPagesForWeek = (weekIndex: number): number => {
    const week = studyPlanData[weekIndex];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const currentCheckedCells = isEditingStudyPlan ? tempCheckedCells : checkedCells;
    const currentActualPages = isEditingStudyPlan ? tempActualPages : actualPages;
    
    return days.reduce((total, day) => {
      const key = `${weekIndex}-${day}`;
      const value = week[day as keyof typeof week] as string;
      const isChecked = currentCheckedCells[key] || false;
      
      // Only count checked days
      if (!isChecked) {
        return total;
      }
      
      // Use actual pages if entered, otherwise use suggested
      if (currentActualPages[key] !== undefined) {
        return total + currentActualPages[key];
      }
      
      // Extract number from value (ignore test text)
      const numMatch = value.match(/^(\d+)/);
      if (numMatch) {
        return total + parseInt(numMatch[1]);
      }
      
      return total;
    }, 0);
  };

  const getDateForCell = (weekIndex: number, dayName: string): string => {
    const week = studyPlanData[weekIndex];
    const dateRange = week.dates;
    
    // Parse start date from the date range (e.g., "20–26 Oct" or "27 Oct–2 Nov")
    const startDateMatch = dateRange.match(/^(\d+)/);
    if (!startDateMatch) return '';
    
    const startDay = parseInt(startDateMatch[1]);
    
    // Extract month(s) from date range
    const monthMatch = dateRange.match(/([A-Z][a-z]{2})/g);
    if (!monthMatch) return '';
    
    const startMonth = monthMatch[0];
    const endMonth = monthMatch[monthMatch.length - 1];
    
    // Map day names to offsets
    const dayOffsets: Record<string, number> = {
      'mon': 0, 'tue': 1, 'wed': 2, 'thu': 3, 'fri': 4, 'sat': 5, 'sun': 6
    };
    
    const offset = dayOffsets[dayName.toLowerCase()];
    if (offset === undefined) return '';
    
    const cellDay = startDay + offset;
    
    // Determine which month to use
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startMonthIndex = monthNames.indexOf(startMonth);
    
    // Handle month overflow
    const daysInMonth: Record<string, number> = {
      'Oct': 31, 'Nov': 30, 'Dec': 31
    };
    
    let finalDay = cellDay;
    let finalMonth = startMonth;
    
    if (cellDay > (daysInMonth[startMonth] || 31)) {
      finalDay = cellDay - (daysInMonth[startMonth] || 31);
      finalMonth = endMonth;
    }
    
    // Format as "1. Dec" or "24. Nov"
    return `${finalDay}. ${finalMonth}`;
  };

  const renderDayCell = (weekIndex: number, day: string, value: string) => {
    const key = `${weekIndex}-${day}`;
    const currentCheckedCells = isEditingStudyPlan ? tempCheckedCells : checkedCells;
    const currentActualPages = isEditingStudyPlan ? tempActualPages : actualPages;
    const isChecked = currentCheckedCells[key] || false;
    const isEmpty = value === '–';
    const isEditing = editingCell === key;
    const hasActualValue = currentActualPages[key] !== undefined;
    const dateHeader = getDateForCell(weekIndex, day);

    // Check if value contains test info and split it
    const testPattern = /^(.*?)\s*\((.*?)\)$/;
    const match = value.match(testPattern);
    
    let mainText = value;
    let helperText = '';
    
    if (match) {
      mainText = match[1].trim();
      helperText = match[2].trim();
    }

    // Extract suggested page number
    const suggestedPages = mainText.match(/^(\d+)/)?.[1] || '';
    const hasTestInfo = mainText.includes('Test');

    return (
      <TableCell className="w-[140px] align-top">
        <div className="flex flex-col gap-1.5">
          {/* Date Header */}
          <div className="text-xs text-gray-500 pb-1 border-b border-gray-200">
            {dateHeader}
          </div>
          
          <div className="flex items-start gap-2">
          {isEditingStudyPlan && (
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => handleCheckChange(weekIndex, day, checked as boolean)}
              disabled={isEmpty}
              className={`mt-0.5 ${isChecked ? 'bg-green-500 border-green-500' : ''}`}
            />
          )}
          <div className="flex flex-col flex-1 min-w-0">
            {isEmpty ? (
              <span className="text-gray-400">–</span>
            ) : isEditing ? (
              <input
                type="number"
                autoFocus
                defaultValue={hasActualValue ? currentActualPages[key] : suggestedPages}
                onBlur={(e) => handlePageInput(weekIndex, day, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePageInput(weekIndex, day, e.currentTarget.value);
                  } else if (e.key === 'Escape') {
                    setEditingCell(null);
                  }
                }}
                className="w-16 px-2 py-0.5 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <div
                onClick={() => !isEmpty && isEditingStudyPlan && setEditingCell(key)}
                className={isEditingStudyPlan ? "cursor-pointer group" : ""}
              >
                {hasActualValue ? (
                  <div className="flex items-baseline gap-1">
                    <span className={`font-medium ${isChecked ? 'line-through text-gray-400' : 'text-blue-600'}`}>
                      {currentActualPages[key]}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      {suggestedPages}
                    </span>
                    {hasTestInfo && (
                      <span className={`text-sm ${isChecked ? 'line-through text-gray-400' : ''}`}>
                        {mainText.replace(/^\d+\s*\+?\s*/, '+ ')}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className={`${isChecked ? 'line-through text-gray-400' : ''} group-hover:text-blue-600`}>
                    {mainText}
                  </span>
                )}
                {helperText && (
                  <span className={`text-xs text-gray-500 mt-0.5 block ${isChecked ? 'line-through text-gray-300' : ''}`}>
                    ({helperText})
                  </span>
                )}
                {!hasActualValue && suggestedPages && isEditingStudyPlan && (
                  <span className="text-xs text-gray-400 mt-0.5 block opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to edit
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      </TableCell>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1>SQE1 Study Plan</h1>
          </div>
          <p className="text-gray-600">11-week preparation schedule • October 21 – December 30, 2025</p>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Weekly Study Tracker</h2>
            <div className="flex gap-2">
              {!isEditingStudyPlan ? (
                <Button onClick={startEditingStudyPlan} variant="outline" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button onClick={saveStudyPlan} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={cancelStudyPlan} variant="outline" size="sm">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="sticky left-0 z-20 bg-gray-100 w-[80px] border-r border-gray-300">Week</TableHead>
                <TableHead className="sticky left-[80px] z-20 bg-gray-100 w-[140px] border-r border-gray-300">Dates</TableHead>
                <TableHead className="sticky left-[220px] z-20 bg-gray-100 w-[350px] border-r border-gray-300">Focus (Topics)</TableHead>
                <TableHead className="w-[140px]">Mon</TableHead>
                <TableHead className="w-[140px]">Tue</TableHead>
                <TableHead className="w-[140px]">Wed</TableHead>
                <TableHead className="w-[140px]">Thu</TableHead>
                <TableHead className="w-[140px]">Fri</TableHead>
                <TableHead className="w-[140px]">Sat</TableHead>
                <TableHead className="w-[140px]">Sun</TableHead>
                <TableHead className="w-[130px]">Planned Pages/wk</TableHead>
                <TableHead className="w-[130px]">Actual Pages/wk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studyPlanData.map((row, index) => {
                const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                return (
                  <TableRow key={row.week} className={bgColor}>
                    <TableCell className={`sticky left-0 z-10 ${bgColor} w-[80px] border-r border-gray-300 align-top`}>
                      {row.week}
                    </TableCell>
                    <TableCell className={`sticky left-[80px] z-10 ${bgColor} w-[140px] border-r border-gray-300 align-top`}>
                      {row.dates}
                    </TableCell>
                    <TableCell className={`sticky left-[220px] z-10 ${bgColor} w-[350px] border-r border-gray-300 align-top`}>
                      {row.focus}
                    </TableCell>
                    {renderDayCell(index, 'mon', row.mon)}
                    {renderDayCell(index, 'tue', row.tue)}
                    {renderDayCell(index, 'wed', row.wed)}
                    {renderDayCell(index, 'thu', row.thu)}
                    {renderDayCell(index, 'fri', row.fri)}
                    {renderDayCell(index, 'sat', row.sat)}
                    {renderDayCell(index, 'sun', row.sun)}
                    <TableCell className="w-[130px] align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-xs text-gray-500 pb-1 border-b border-gray-200 opacity-0">-</div>
                        <div className="mt-0.5">{row.pagesPerWeek}</div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[130px] align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="text-xs text-gray-500 pb-1 border-b border-gray-200 opacity-0">-</div>
                        <div className="mt-0.5">
                          {(() => {
                            const actualTotal = getActualPagesForWeek(index);
                            return actualTotal > 0 ? (
                              <span className="font-medium text-green-600">{actualTotal}</span>
                            ) : (
                              <span className="text-gray-400">–</span>
                            );
                          })()}
                        </div>
                      </div>
                    </TableCell>

                  </TableRow>
                );
              })}
              
              {/* Total Row */}
              <TableRow className="bg-blue-50 border-t-2 border-blue-300">
                <TableCell className="sticky left-0 z-10 bg-blue-50 w-[80px] border-r border-gray-300">
                  TOTAL
                </TableCell>
                <TableCell className="sticky left-[80px] z-10 bg-blue-50 w-[140px] border-r border-gray-300">
                  –
                </TableCell>
                <TableCell className="sticky left-[220px] z-10 bg-blue-50 w-[350px] border-r border-gray-300">
                  –
                </TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[140px]">–</TableCell>
                <TableCell className="w-[130px]">521 ✓</TableCell>
                <TableCell className="w-[130px]">
                  {(() => {
                    const grandTotal = studyPlanData.reduce((sum, _, index) => {
                      return sum + getActualPagesForWeek(index);
                    }, 0);
                    return grandTotal > 0 ? (
                      <span className="font-medium text-green-600">{grandTotal}</span>
                    ) : (
                      <span className="text-gray-400">–</span>
                    );
                  })()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        </div>

        {/* Activities Card */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-6 w-6 text-blue-600" />
                <CardTitle>Total Activities</CardTitle>
              </div>
              <div className="flex gap-2">
                {!isEditingActivities ? (
                  <Button onClick={startEditingActivities} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button onClick={saveActivities} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={cancelActivities} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-[200px]">Subject</TableHead>
                    <TableHead className="w-[120px]">Activities</TableHead>
                    <TableHead className="w-[120px]">Hours</TableHead>
                    <TableHead className="min-w-[500px]">Checklist</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activitiesData.map((row, index) => {
                    const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    return (
                      <TableRow key={row.subject} className={bgColor}>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.activities}</TableCell>
                        <TableCell>{row.hours}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-3">
                            {Array.from({ length: row.activities }, (_, i) => i + 1).map((num) => {
                              const key = `${row.subject}-${num}`;
                              const currentCheckedActivities = isEditingActivities ? tempCheckedActivities : checkedActivities;
                              const isChecked = currentCheckedActivities[key] || false;
                              return (
                                <div key={num} className="flex items-center gap-1">
                                  {isEditingActivities && (
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) =>
                                        handleActivityCheckChange(row.subject, num, checked as boolean)
                                      }
                                      className={isChecked ? 'bg-green-500 border-green-500' : ''}
                                    />
                                  )}
                                  <span className={`text-sm ${isChecked ? 'line-through text-gray-400' : ''}`}>
                                    {num}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Total Row */}
                  <TableRow className="bg-blue-50 border-t-2 border-blue-300">
                    <TableCell>Total</TableCell>
                    <TableCell>58</TableCell>
                    <TableCell>116 h ✓</TableCell>
                    <TableCell>–</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Videos Card */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="h-6 w-6 text-blue-600" />
                <CardTitle>Videos</CardTitle>
              </div>
              <div className="flex gap-2">
                {!isEditingVideos ? (
                  <Button onClick={startEditingVideos} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button onClick={saveVideos} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={cancelVideos} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-[300px]">Subject</TableHead>
                    <TableHead className="w-[120px]">Hours</TableHead>
                    <TableHead className="w-[120px]">Videos</TableHead>
                    <TableHead className="w-[300px]">Approx dates</TableHead>
                    <TableHead className="min-w-[300px]">Checklist</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videosData.map((row, index) => {
                    const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    return (
                      <TableRow key={row.subject} className={bgColor}>
                        <TableCell>{row.subject}</TableCell>
                        <TableCell>{row.hours}</TableCell>
                        <TableCell>{row.videos}</TableCell>
                        <TableCell className="text-sm">{row.dates}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-3">
                            {Array.from({ length: row.videos }, (_, i) => i + 1).map((num) => {
                              const key = `${row.subject}-${num}`;
                              const currentCheckedVideos = isEditingVideos ? tempCheckedVideos : checkedVideos;
                              const isChecked = currentCheckedVideos[key] || false;
                              return (
                                <div key={num} className="flex items-center gap-1">
                                  {isEditingVideos && (
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={(checked) =>
                                        handleVideoCheckChange(row.subject, num, checked as boolean)
                                      }
                                      className={isChecked ? 'bg-green-500 border-green-500' : ''}
                                    />
                                  )}
                                  <span className={`text-sm ${isChecked ? 'line-through text-gray-400' : ''}`}>
                                    {num}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Total Row */}
                  <TableRow className="bg-blue-50 border-t-2 border-blue-300">
                    <TableCell>Total</TableCell>
                    <TableCell>18 h (27 h study)</TableCell>
                    <TableCell>18 videos ✓</TableCell>
                    <TableCell>–</TableCell>
                    <TableCell>–</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Tests Plan Card */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-7 w-7 text-blue-600" />
                <CardTitle className="text-xl">Tests Plan</CardTitle>
              </div>
              <div className="flex gap-2">
                {!isEditingTests ? (
                  <Button onClick={startEditingTests} variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button onClick={saveTests} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={cancelTests} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table className="w-auto">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="whitespace-nowrap px-3">Test #</TableHead>
                    <TableHead className="whitespace-nowrap px-3">Duration</TableHead>
                    <TableHead className="whitespace-nowrap px-3">Study Time (2×)</TableHead>
                    <TableHead className="whitespace-nowrap px-3">Placement</TableHead>
                    <TableHead className="whitespace-nowrap px-3">Checklist</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testsData.map((row, index) => {
                    const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                    const currentCheckedTests = isEditingTests ? tempCheckedTests : checkedTests;
                    const isChecked = currentCheckedTests[row.testNum] || false;
                    return (
                      <TableRow key={row.testNum} className={bgColor}>
                        <TableCell className="px-3 whitespace-nowrap">{row.testNum}</TableCell>
                        <TableCell className="px-3 whitespace-nowrap">{row.duration}</TableCell>
                        <TableCell className="px-3 whitespace-nowrap">{row.studyTime}</TableCell>
                        <TableCell className="px-3 whitespace-nowrap">{row.placement}</TableCell>
                        <TableCell className="px-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {isEditingTests && (
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  handleTestCheckChange(row.testNum, checked as boolean)
                                }
                                className={isChecked ? 'bg-green-500 border-green-500' : ''}
                              />
                            )}
                            <span className={isChecked ? 'line-through text-gray-400' : ''}>
                              {row.label}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Total Row */}
                  <TableRow className="bg-blue-50 border-t-2 border-blue-300">
                    <TableCell className="px-3 whitespace-nowrap">Total</TableCell>
                    <TableCell className="px-3 whitespace-nowrap">–</TableCell>
                    <TableCell className="px-3 whitespace-nowrap">27 h ✓</TableCell>
                    <TableCell className="px-3 whitespace-nowrap">–</TableCell>
                    <TableCell className="px-3 whitespace-nowrap">–</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Notes */}
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p>* Click checkboxes to mark daily tasks as complete</p>
          <p>* Dec 23–24 are off days (Week 10)</p>
          <p>* Total excludes break days</p>
        </div>
      </div>
    </div>
  );
}
