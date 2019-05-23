/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.TuiGongDao;
import com.lb.lbstore.domain.TuiGong;
import com.lb.lbstore.service.TuiGongService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("tuiGongServiceImpl")
public class TuiGongServiceImpl implements TuiGongService {

    @Autowired
    private TuiGongDao tuiGongDao;

    @Override
    public TuiGong getTuiGongById(Integer id) {
        return (TuiGong) tuiGongDao.findObjectById(TuiGong.class, id);
    }
    
    @Override
    public TuiGong getTuiGongDetailById(Integer id) {
        return  tuiGongDao.getTuiGongDetailById(id);
    }

    @Override
    public boolean updateTuiGong(TuiGong tuiGong) {
        return tuiGongDao.updateTuiGong(tuiGong);
    }

    @Override
    public TuiGong saveTuiGong(TuiGong tuiGong) {
        int id = tuiGongDao.saveTuiGong(tuiGong);
        return (TuiGong) tuiGongDao.findObjectById(TuiGong.class, id);
    }

    @Override
    public boolean deleteTuiGong(Integer id) {
        return tuiGongDao.deleteTuiGong(id);
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from TuiGong where qy_id="+map.get("qy_id");
        if (map.containsKey("mc")) {
            sql += " and mc like '%" + map.get("mc") + "%'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return tuiGongDao.getCount(sql, null);
    }

    @Override
    public List<TuiGong> queryTuiGongsByPage(HashMap map) {
        return tuiGongDao.queryTuiGongsByPage(map);
    }

    @Override
    public String dealTuiGong(TuiGong tuiGong,Integer a01_id) {
        return tuiGongDao.dealTuiGong(tuiGong, a01_id);
    }

}
