package scubaLive;

public class Dive {
	
	private DiveTable dtable;
	private int bottomt;
	private int ddepth;
	private char spg;
	private char fpg;
	private boolean ssrequired;
	private boolean safe;
	private int diveid;
	public int[] result;

	public Dive(DiveTable divt, SurfaceTable surft, int id) {
		this.dtable = divt;
		bottomt = 0;
		ddepth = 0;
		diveid = id;
		spg = 'a';
		fpg = 'a';
		ssrequired = false;
		safe = true;
		result = null;
	}
	
	public void updateDive(int time, int depth, char startpg) {
		int maxbt = dtable.maxBT(startpg, depth);
		result = new int[]{time, depth, (int) startpg, (int) 'a', 0, 1};
		
		bottomt = time;
		ddepth = depth;
		spg = startpg;
		this.result [2] = startpg;
		
		//If time requested is past the maximum bottom time at depth & spg set return array to carry user recomendations for UI warnings
		if (maxbt < time || (diveid > 1 && startpg == 'a')) {
			safe = false;
			result[0] = maxbt;
			result[1] = dtable.maxDepth(time, startpg);
			result[5] = 0;
			// find new spg if possible
			if(startpg != 'a') {
				if (dtable.maxBT('a', depth) > time) {
					result[2] = dtable.minPG(time, depth);
					result[3] = dtable.diveFPG((char) result[2], depth, time);
					result[4] = dtable.ssTest((char) result[3], depth) ? 1 : 0;
				}
			}
		}
		else {
			fpg = dtable.diveFPG(startpg, depth, time);
			result[3] = fpg;
			ssrequired = dtable.ssTest(fpg, depth);
			result[4] = ssrequired ? 1 : 0;
		} 
		
		
	}
	
	public void updateDive(char startpg) {
		int maxbt = dtable.maxBT(startpg, ddepth);
		result = new int[]{bottomt, ddepth, (int) startpg, (int) 'a', 0, 1};
		
		spg = startpg;
		result [2] = startpg;
		
		//If time requested is past the maximum bottom time at depth & spg set return array to carry user recomendations for UI warnings
		if (maxbt < bottomt || (diveid > 1 && spg == 'a')) {
			safe = false;
			result[0] = maxbt;
			result[1] = dtable.maxDepth(bottomt, startpg);
			result[5] = 0;
			// find new spg if possible
			if(startpg != 'a') {
				if (dtable.maxBT('a', ddepth) > bottomt) {
					result[2] = dtable.minPG(bottomt, ddepth);
					result[3] = dtable.diveFPG((char) result[2], ddepth, bottomt);
					result[4] = dtable.ssTest((char) result[3], ddepth) ? 1 : 0;
				}
			}
		}
		else {
			fpg = dtable.diveFPG(startpg, ddepth, bottomt);
			safe = true;
			result[3] = fpg;
			ssrequired = dtable.ssTest(fpg, ddepth);
			result[4] = ssrequired ? 1 : 0;
		} 
		
	}
	
	public boolean isSafe() {
		return safe;
	}
	
	public int getBT() {
		return bottomt;
	}
	
	public int getDepth() {
		return ddepth;
	}
	
	public char getSPG() {
		return spg;
	}
	
	public char getFPG() {
		return fpg;
	}
	
	public char getMPG() {
		return dtable.minPG(bottomt, ddepth);
	}
	
	public boolean getSS() {
		return ssrequired;
	}
	
	public String getWarnings() {
		String string = new String();
		
		if(safe) string = "Safe Dive\n";
		else string = "Unsafe Dive, max bottom time at " + ddepth + "m" + " is " + result[0] + " minutes diving from " + ((spg == 'a') ? "the surface": "pressure group " + spg) + ".\n";
		if(diveid > 1 && spg == 'a') string = string + "Dive is unsafe because of previous dive\n";
		
		return string;
	}
	
	@Override
	public String toString() {
		String output =  "*********Dive " + diveid + "*********\n";
		
		output = output + "Bottom Time = " + bottomt + ", Depth = " + ddepth + " SPG = " + spg + ", FPG = " + fpg +"\n";
		output = output + this.getWarnings();
		if(safe) {
			if(ssrequired) {
				output = output + "SS Required\n";
			} else {
				output = output + "SS not required, but always recommended.\n";
			}
		}
		
		output = output + "*********************\n";
		return output;
	}
	
	public void draw() {
		
	}
}
