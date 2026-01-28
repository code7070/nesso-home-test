import { describe, it, expect, beforeEach } from "vitest";
import { jobService } from "@/services/jobService";
import type { JobFilters } from "@/types/filters";
import { DEFAULT_FILTERS, DEFAULT_SORT } from "@/types/filters";

describe("jobService", () => {
  describe("getAllJobs", () => {
    it("should return all jobs", async () => {
      const jobs = await jobService.getAllJobs();
      expect(jobs).toBeDefined();
      expect(jobs.length).toBeGreaterThan(0);
    });

    it("should return jobs with required properties", async () => {
      const jobs = await jobService.getAllJobs();
      const job = jobs[0];

      expect(job).toHaveProperty("id");
      expect(job).toHaveProperty("title");
      expect(job).toHaveProperty("company");
      expect(job).toHaveProperty("location");
      expect(job).toHaveProperty("locationType");
      expect(job).toHaveProperty("jobType");
      expect(job).toHaveProperty("experienceLevel");
      expect(job).toHaveProperty("salary");
      expect(job).toHaveProperty("description");
      expect(job).toHaveProperty("tags");
    });
  });

  describe("getJobById", () => {
    it("should return a job by id", async () => {
      const allJobs = await jobService.getAllJobs();
      const firstJob = allJobs[0];
      const job = await jobService.getJobById(firstJob.id);

      expect(job).toBeDefined();
      expect(job?.id).toBe(firstJob.id);
    });

    it("should return undefined for non-existent id", async () => {
      const job = await jobService.getJobById("non-existent-id");
      expect(job).toBeUndefined();
    });
  });

  describe("searchJobs - filtering", () => {
    let baseFilters: JobFilters;

    beforeEach(() => {
      baseFilters = { ...DEFAULT_FILTERS };
    });

    it("should return all jobs with default filters", async () => {
      const allJobs = await jobService.getAllJobs();
      const filteredJobs = await jobService.searchJobs(baseFilters, DEFAULT_SORT);

      expect(filteredJobs.length).toBe(allJobs.length);
    });

    it("should filter by search term in title", async () => {
      const filters = { ...baseFilters, search: "Engineer" };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        const matchesSearch =
          job.title.toLowerCase().includes("engineer") ||
          job.company.toLowerCase().includes("engineer") ||
          job.description.toLowerCase().includes("engineer") ||
          job.tags.some((tag) => tag.toLowerCase().includes("engineer"));
        expect(matchesSearch).toBe(true);
      });
    });

    it("should filter by search term in company", async () => {
      const allJobs = await jobService.getAllJobs();
      const firstCompany = allJobs[0].company;
      const filters = { ...baseFilters, search: firstCompany };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        expect(job.company.toLowerCase()).toContain(firstCompany.toLowerCase());
      });
    });

    it("should return empty array for non-matching search", async () => {
      const filters = { ...baseFilters, search: "XYZNonExistentJobTitle123" };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs).toEqual([]);
    });

    it("should filter by location type", async () => {
      const filters: JobFilters = { ...baseFilters, locationType: ["remote"] };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        expect(job.locationType).toBe("remote");
      });
    });

    it("should filter by multiple location types", async () => {
      const filters: JobFilters = { ...baseFilters, locationType: ["remote", "hybrid"] };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        expect(["remote", "hybrid"]).toContain(job.locationType);
      });
    });

    it("should filter by job type", async () => {
      const filters: JobFilters = { ...baseFilters, jobType: ["full-time"] };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        expect(job.jobType).toBe("full-time");
      });
    });

    it("should filter by experience level", async () => {
      const filters: JobFilters = { ...baseFilters, experienceLevel: ["senior"] };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      expect(jobs.length).toBeGreaterThan(0);
      jobs.forEach((job) => {
        expect(job.experienceLevel).toBe("senior");
      });
    });

    it("should filter by salary range", async () => {
      const filters = {
        ...baseFilters,
        salaryRange: { min: 100000, max: 200000 },
      };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      jobs.forEach((job) => {
        // Job should overlap with the salary range
        expect(job.salary.max).toBeGreaterThanOrEqual(100000);
        expect(job.salary.min).toBeLessThanOrEqual(200000);
      });
    });

    it("should filter by posted within - 24h", async () => {
      // Note: This test depends on mock data having recent jobs
      const filters = { ...baseFilters, postedWithin: "24h" as const };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      jobs.forEach((job) => {
        const postedDate = new Date(job.postedDate);
        expect(postedDate >= yesterday).toBe(true);
      });
    });

    it("should combine multiple filters", async () => {
      const filters: JobFilters = {
        ...baseFilters,
        search: "Developer",
        locationType: ["remote"],
        jobType: ["full-time"],
        experienceLevel: ["senior"],
      };
      const jobs = await jobService.searchJobs(filters, DEFAULT_SORT);

      jobs.forEach((job) => {
        // Check search
        const matchesSearch =
          job.title.toLowerCase().includes("developer") ||
          job.company.toLowerCase().includes("developer") ||
          job.description.toLowerCase().includes("developer") ||
          job.tags.some((tag) => tag.toLowerCase().includes("developer"));
        expect(matchesSearch).toBe(true);

        // Check filters
        expect(job.locationType).toBe("remote");
        expect(job.jobType).toBe("full-time");
        expect(job.experienceLevel).toBe("senior");
      });
    });
  });

  describe("searchJobs - sorting", () => {
    let baseFilters: JobFilters;

    beforeEach(() => {
      baseFilters = { ...DEFAULT_FILTERS };
    });

    it("should sort by date descending (newest first)", async () => {
      const jobs = await jobService.searchJobs(baseFilters, "date-desc");

      for (let i = 1; i < jobs.length; i++) {
        const prevDate = new Date(jobs[i - 1].postedDate);
        const currDate = new Date(jobs[i].postedDate);
        expect(prevDate >= currDate).toBe(true);
      }
    });

    it("should sort by date ascending (oldest first)", async () => {
      const jobs = await jobService.searchJobs(baseFilters, "date-asc");

      for (let i = 1; i < jobs.length; i++) {
        const prevDate = new Date(jobs[i - 1].postedDate);
        const currDate = new Date(jobs[i].postedDate);
        expect(prevDate <= currDate).toBe(true);
      }
    });

    it("should sort by salary descending (highest first)", async () => {
      const jobs = await jobService.searchJobs(baseFilters, "salary-desc");

      for (let i = 1; i < jobs.length; i++) {
        expect(jobs[i - 1].salary.max >= jobs[i].salary.max).toBe(true);
      }
    });

    it("should sort by salary ascending (lowest first)", async () => {
      const jobs = await jobService.searchJobs(baseFilters, "salary-asc");

      for (let i = 1; i < jobs.length; i++) {
        expect(jobs[i - 1].salary.min <= jobs[i].salary.min).toBe(true);
      }
    });

    it("should sort by company name alphabetically", async () => {
      const jobs = await jobService.searchJobs(baseFilters, "company");

      for (let i = 1; i < jobs.length; i++) {
        expect(
          jobs[i - 1].company.localeCompare(jobs[i].company)
        ).toBeLessThanOrEqual(0);
      }
    });
  });
});
